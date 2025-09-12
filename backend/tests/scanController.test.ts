
jest.mock('../src/controllers/scanController', () => {
  const originalModule = jest.requireActual('../src/controllers/scanController');
  
  return {
    ...originalModule,
    processScanInBackground: jest.fn().mockImplementation(async (scanId: string) => {
      return Promise.resolve();
    })
  };
});
import { createScan } from "../src/controllers/scanController";
import Scan from "../src/models/Scan";
import {
  setupTestDB,
  tearDownTestDB,
  mockRequest,
  mockResponse,
  clearDatabase
} from "./testUtils";

describe("Scan Controller", () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await tearDownTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
    jest.clearAllMocks();
  });

  describe("POST /scan", () => {
    it("should create a new scan with valid URLs", async () => {
      const req = mockRequest({
        urls: ["https://example.com", "https://test.com"],
      });
      const res = mockResponse();

      await createScan(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: expect.any(String),
        status: 'pending',
        urls: ['https://example.com', 'https://test.com'],
        createdAt: expect.any(String),
        message: "Scan initiated",
      });


      const scans = await Scan.find();
      expect(scans).toHaveLength(1);
      expect(scans[0].urls).toEqual([
        "https://example.com",
        "https://test.com",
      ]);
      expect(scans[0].status).toBe("pending");
    });
  });
});