# Plan: Greenfield Pet API

**TL;DR**: Build the `Pet` domain following the DDD architecture (entity → repository → service → router). Part 1 creates the GET-only API with integration tests. Part 2 adds a uniqueness-per-owner rule. A `save` method is added to service/repo (not exposed via API) — needed to make Part 2 testable.

---

## Part 1 — Pet API

**Step 1 — Infrastructure + Pet domain files** ✅
- `src/data.sql` — `pets` table (`id INTEGER PRIMARY KEY AUTOINCREMENT`, `name TEXT NOT NULL`, `owner_name TEXT NOT NULL`) + 3 seed rows
- `src/database.ts` — TypeORM `DataSource` (better-sqlite3, `:memory:`, loads `data.sql`, registers `Pet`)
- `src/pet/pet.ts` — `@Entity('pets')`, `@PrimaryGeneratedColumn()`, `@Column()` name, `@Column({ name: 'owner_name' })` ownerName; readonly props + constructor
- `src/pet/petRepository.ts` — `findById(id)`, `findByNameOrOwnerName(name?, ownerName?)`
- `src/pet/petService.ts` — delegates to repository: `findById`, `findByNameOrOwnerName`
- `src/pet/petRouter.ts` — `GET /api/v1/pets/:id`, `GET /api/v1/pets?name=&ownerName=` with `@openapi` JSDoc
- `src/app.ts` — initialize DataSource, register petRouter

**Step 2 — Tests** ✅
- `tests/testDataSource.ts` — `createTestDataSource()` helper: fresh in-memory SQLite, runs `data.sql`
- `tests/pet/petService.test.ts` — integration tests: `should find pet by id`, `should return null when pet not found`, `should find pets by name`, `should find pets by ownerName`, `should return all pets when no filter provided`

**Verification:** `npm test` → then `npm run dev` + `http://localhost:8080/api-docs`

---

## Part 2 — Uniqueness Rule

**Step 1 — Add uniqueness enforcement**
- `src/data.sql` — add `UNIQUE(name, owner_name)` constraint to pets table
- `src/pet/petRepository.ts` — add `save(name, ownerName)` method
- `src/pet/petService.ts` — add `save(name, ownerName)`: checks for existing pet with same name+ownerName, throws if duplicate, otherwise delegates to repository

**Step 2 — Tests**
- `tests/pet/petService.test.ts` — add: `should save a pet`, `shouldNot save a pet with the same name for the same owner`

**Verification:** `npm test`

---

## Relevant files
- `greenfield-backend/src/app.ts` — add DB init + router
- `greenfield-backend/src/data.sql` — new
- `greenfield-backend/src/database.ts` — new
- `greenfield-backend/src/pet/pet.ts` — new
- `greenfield-backend/src/pet/petRepository.ts` — new
- `greenfield-backend/src/pet/petService.ts` — new
- `greenfield-backend/src/pet/petRouter.ts` — new
- `greenfield-backend/tests/testDataSource.ts` — new
- `greenfield-backend/tests/pet/petService.test.ts` — new

## Decisions
- `save` exists on service/repo but is not exposed via the router — needed solely for Part 2 testing
- Uniqueness enforced at service level (throws meaningful error) + `UNIQUE` DB constraint as safety net
- Simple business rule → integration test (no `vi.mock()`)
- Seed data uses IDs 1–3; test-generated data won't conflict
