import { describe, expect, it } from "vitest";

import { GetUser } from "../../src/application/use-cases/GetUser.js";
import { User } from "../../src/domain/entities/User.js";
import { InMemoryUserRepository } from "../doubles/InMemoryUserRepository.js";

describe("GetUser", () => {
  it("should get a user by id", async () => {
    const repository = new InMemoryUserRepository();
    const getUser = new GetUser(repository);

    const date = new Date("2026-01-01T00:00:00.000Z");

    const user = new User({
      id: "user-1",
      name: "Ana Silva",
      email: "ana@example.com",
      role: "USER",
      createdAt: date,
      updatedAt: date,
    });

    await repository.create(user);

    const result = await getUser.execute("user-1");

    expect(result).toBe(user);
  });
});