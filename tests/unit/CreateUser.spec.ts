import { describe, expect, it } from "vitest";

import { CreateUser } from "../../src/application/use-cases/CreateUser.js";
import { InMemoryUserRepository } from "../doubles/InMemoryUserRepository.js";

describe("CreateUser", () => {
  it("should create a user", async () => {
    const repository = new InMemoryUserRepository();
    const createUser = new CreateUser(repository);

    const user = await createUser.execute({
      name: "Ana Silva",
      email: "ana@example.com",
      role: "USER",
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBe("Ana Silva");
    expect(user.email).toBe("ana@example.com");
    expect(user.role).toBe("USER");
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);

    const storedUser = await repository.findById(user.id);

    expect(storedUser).toBe(user);
  });
});

it("should reject a duplicated email", async () => {
  const repository = new InMemoryUserRepository();
  const createUser = new CreateUser(repository);

  await createUser.execute({
    name: "Ana Silva",
    email: "ana@example.com",
    role: "USER",
  });

  await expect(
    createUser.execute({
      name: "Maria Silva",
      email: "ANA@EXAMPLE.COM",
      role: "ADMIN",
    }),
  ).rejects.toThrow("User email already exists.");
});