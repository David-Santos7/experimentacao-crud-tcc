import { describe, expect, it } from "vitest";

import { ListUsers } from "../../src/application/use-cases/ListUsers.js";
import { User } from "../../src/domain/entities/User.js";
import { InMemoryUserRepository } from "../doubles/InMemoryUserRepository.js";

describe("ListUsers", () => {
  it("should list users", async () => {
    const repository = new InMemoryUserRepository();
    const listUsers = new ListUsers(repository);

    const date = new Date("2026-01-01T00:00:00.000Z");

    const firstUser = new User({
      id: "user-1",
      name: "Ana Silva",
      email: "ana@example.com",
      role: "USER",
      createdAt: date,
      updatedAt: date,
    });

    const secondUser = new User({
      id: "user-2",
      name: "Carlos Souza",
      email: "carlos@example.com",
      role: "ADMIN",
      createdAt: date,
      updatedAt: date,
    });

    await repository.create(firstUser);
    await repository.create(secondUser);

    const users = await listUsers.execute();

    expect(users).toHaveLength(2);
    expect(users).toEqual(
      expect.arrayContaining([firstUser, secondUser]),
    );
  });
});

it("should return an empty list when there are no users", async () => {
  const repository = new InMemoryUserRepository();
  const listUsers = new ListUsers(repository);

  const users = await listUsers.execute();

  expect(users).toEqual([]);
});