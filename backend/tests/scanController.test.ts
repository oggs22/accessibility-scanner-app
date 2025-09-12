jest.mock("../src/controllers/scanController", () => {
  const originalModule = jest.requireActual(
    "../src/controllers/scanController"
  );

  return {
    ...originalModule,
    processScanInBackground: jest
      .fn()
      .mockImplementation(async (scanId: string) => {
        return Promise.resolve();
      }),
  };
});
import {
  createScan,
  deleteScan,
  getScan,
  getScanList,
} from "../src/controllers/scanController";
import Scan from "../src/models/Scan";
import {
  setupTestDB,
  tearDownTestDB,
  mockRequest,
  mockResponse,
  clearDatabase,
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
        status: "pending",
        urls: ["https://example.com", "https://test.com"],
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

    it("should return 400 for empty URLs array", async () => {
      const req = mockRequest({
        urls: [],
      });
      const res = mockResponse();

      await createScan(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Validation error",
        errors: expect.arrayContaining([
          expect.objectContaining({
            message: "At least one valid URL is required",
          }),
        ]),
      });
    });

    describe("GET /scan/:id", () => {
      it("should return scan by id", async () => {
        const scan = await Scan.create({
          urls: ["https://example.com"],
          status: "completed",
        });

        const { id } = scan;

        const req = mockRequest({}, { id: id.toString() });
        const res = mockResponse();

        await getScan(req, res);

        expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
            _id: scan._id,
            urls: ["https://example.com"],
            status: "completed",
          })
        );
      });

      it("should return 500 for invalid id format", async () => {
        const req = mockRequest({}, { id: "invalid-id" });
        const res = mockResponse();

        await getScan(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
      });
    });
  });

  describe("GET /scan-list", () => {
    it("should return list of scans", async () => {
      await Scan.create([
        {
          urls: ["https://example1.com"],
          status: "completed",
          createdAt: new Date("2024-01-01"),
        },
        {
          urls: ["https://example2.com"],
          status: "pending",
          createdAt: new Date("2024-01-02"),
        },
      ]);

      const req = mockRequest();
      const res = mockResponse();

      await getScanList(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
      expect(res.json.mock.calls[0][0]).toHaveLength(2);
      expect(res.json.mock.calls[0][0][0]).toHaveProperty("urls");
      expect(res.json.mock.calls[0][0][0]).toHaveProperty("status");
    });

    it("should return empty array when no scans exist", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await getScanList(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe("DELETE /scan/:id", () => {
    it("should delete existing scan", async () => {
      const scan = await Scan.create({
        urls: ["https://example.com"],
        status: "completed",
      });

      const { id } = scan;

      const req = mockRequest({}, { id: id.toString() });
      const res = mockResponse();

      await deleteScan(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Scan deleted successfully",
      });

      const deletedScan = await Scan.findById(scan._id);
      expect(deletedScan).toBeNull();
    });

    it("should return 404 when trying to delete non-existent scan", async () => {
      const req = mockRequest({}, { id: "507f1f77bcf86cd799439011" });
      const res = mockResponse();

      await deleteScan(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Scan not found",
      });
    });
  });
});
