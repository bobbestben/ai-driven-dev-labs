# Part 1 – Pet API (GET endpoints)

## Step 1.1 – Data layer

- Verify/create `src/data.sql` with the `pet` table schema (SQLite syntax) and seed data
- Create `Pet` entity (`src/pet/pet.ts`) with TypeORM decorators, `readonly` properties (`id`, `name`, `ownerName`), no setters, and a constructor with optional parameters
- Create `PetRepository` class (`src/pet/petRepository.ts`) wrapping TypeORM `Repository<Pet>`, accepting an optional `DataSource` in the constructor, with methods `findById(id)` and `findByName(name)` (returns `Pet[]`)

## Step 1.2 – Service & Router

- Create `PetService` (`src/pet/petService.ts`) with two methods: `findById(id: number)` and `findByName(name: string)`
- Create `petRouter` (`src/pet/petRouter.ts`) — Express Router mounted at `/api/v1/pets` exposing:
  - `GET /api/v1/pets/:id` — find by id
  - `GET /api/v1/pets?name=...` — find by name (returns a list)
- Register the router in `src/app.ts`

# Time to run the application and connect to swagger-ui

> `npm run dev` — starts the server on port 8080
> Open `http://localhost:8080/api-docs` for the Swagger UI

# Part 2 – Uniqueness business rule + tests

## Step 2.1 – Business rule

- Add a unique constraint on `(owner_name, name)` in `data.sql`
- Add `findByNameAndOwnerName(name, ownerName)` to `PetRepository`
- Add `save(pet: Pet)` in `PetService` — throws an `Error` if an owner already has a pet with the same name; otherwise saves

## Step 2.2 – Tests

- Create a `tests/testDataSource.ts` helper that creates a fresh in-memory SQLite `DataSource` and runs `data.sql`
- Create `tests/pet/petService.test.ts` (Vitest, given/when/then style):
  - `should find pet by id` — happy path
  - `should find pets by name` — returns results for a shared name
  - `should not allow duplicate pet name for the same owner` — saving two pets with the same owner + name throws

# Time to run the unit tests

> `npm test` — runs all Vitest tests
