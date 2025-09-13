package com.petclinic.pet;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<Pet> findAll() {
        return petService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> findById(@PathVariable Long id) {
        Optional<Pet> pet = petService.findById(id);
        return pet.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<Pet> findByName(@RequestParam String name) {
        Optional<Pet> pet = petService.findByName(name);
        return pet.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pet> save(@RequestBody Pet pet) {
        Pet savedPet = petService.save(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPet);
    }
}
