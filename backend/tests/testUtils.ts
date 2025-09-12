import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod: MongoMemoryServer;

export const setupTestDB = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
};

export const tearDownTestDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    try {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        await collections[key].deleteMany({});
      }

      await mongoose.disconnect();
    } catch (error) {
      console.warn("Error during test DB teardown:", error);
    }
  }

  if (mongod) {
    try {
      await mongod.stop();
    } catch (error) {
      console.warn("Error stopping MongoDB memory server:", error);
    }
  }
};

export const clearDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
};

export const mockRequest = (
  body: any = {},
  params: any = {},
  query: any = {}
): any => ({
  body,
  params,
  query,
});

export const mockResponse = (): any => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
