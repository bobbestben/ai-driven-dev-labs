package com.petclinic.pet;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class PetServiceTest {

    @Autowired
    private PetService petService;

    @Test
    void shouldFindPetById() {
        // Given
        Pet pet = new Pet("Buddy", "John Doe");
        Pet savedPet = petService.save(pet);

        // When
        Optional<Pet> foundPet = petService.findById(savedPet.getId());

        // Then
        assertThat(foundPet).isPresent();
        assertThat(foundPet.get().getName()).isEqualTo("Buddy");
    }

    @Test
    void shouldFindPetByName() {
        // Given
        Pet pet = new Pet("Bob", "Jane Smith");
        petService.save(pet);

        // When
        Optional<Pet> foundPet = petService.findByName("Bob");

        // Then
        assertThat(foundPet).isPresent();
        assertThat(foundPet.get().getName()).isEqualTo("Bob");
    }

    @Test
    void shouldReturnEmptyWhenPetNotFoundById() {
        // When
        Optional<Pet> foundPet = petService.findById(999L);

        // Then
        assertThat(foundPet).isEmpty();
    }

    @Test
    void shouldReturnEmptyWhenPetNotFoundByName() {
        // When
        Optional<Pet> foundPet = petService.findByName("NonExistentPet");

        // Then
        assertThat(foundPet).isEmpty();
    }
}
