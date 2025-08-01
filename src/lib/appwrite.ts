import "server-only";

import { Client, Account, Databases, Users } from "node-appwrite";

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "@/config";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);
  
  const session = (await cookies()).get(AUTH_COOKIE);
  
  if (!session || !session.value) {
    throw new Error("Unauthorized");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    }
  };
};

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client);
    }
  };
}
