# Execution Plan — Greenfield Frontend Pet List

All code is generated in `greenfield-frontend/`.

## Part 1: Pet List Display

**Step 1** ✅︎ — Create `src/pet/petService.ts` with a `Pet` interface and a `findAll()` function using the Fetch API against `http://localhost:8080/api/v1/pets`.

**Step 2** ✅︎ — Create `src/pet/PetList.tsx` (dedicated component rendering the list), then update `src/App.tsx` to include `<PetList />`. Then invite you to run the app for manual testing.

## Part 2: Testing

**Step 3** ✅︎ — Create `tests/PetList.test.tsx` with component tests using `data-testid` selectors and mocked `petService`. Then invite you to run `npm test`.
