# Execution Plan — Brownfield Backend Owner Refactoring

All code is generated in `brownfield-backend/`.

## Part 1: Schema & Entity

**Step 1** ✅︎ — Create `src/owner/owner.ts` (Owner entity with `id`, `name`, `address`) and update `src/data.sql`: add `owner` table, seed owners, update `pet` table to use `owner_id` FK (drop `owner_name` column), reseed pets referencing owner IDs.

**Step 2** ✅︎ — Update `src/pet/pet.ts` to replace `ownerName` column with `@ManyToOne(() => Owner)` relationship. Register `Owner` entity in `src/database.ts`.

## Part 2: Repository, Service & Router

**Step 3** ✅︎ — Update `src/pet/petRepository.ts` to load the owner relation (`find({ relations: ['owner'] })`), update `findByNameAndOwnerName` to query by `owner.id`. Update `src/pet/petService.ts` validation logic to work with the new Owner object.

**Step 4** ✅︎ — Update `src/pet/petRouter.ts`: the POST body now accepts `ownerId` (integer) instead of `ownerName` (string). Owner is returned nested inside Pet responses.

## Part 3: Tests

**Step 5** ✅︎ — Update `tests/pet/petService.test.ts` to reflect the new Owner relationship: seed an Owner, reference it when creating Pets, update all assertions.
