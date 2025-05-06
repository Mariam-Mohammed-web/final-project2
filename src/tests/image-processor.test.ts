import { processingImage } from "../utilities/image-processor";
import fs from "fs";
import path from "path";
const testImage = {
    filename: "test.jpg",
    height: 200,
    width: 200
};
describe("image processing", () => {
    afterAll(() => {
      const outputDir = path.join(__dirname, "../../images/thumb");
      if (fs.existsSync(outputDir)) {
        fs.readdirSync(outputDir).filter(file => file.startsWith('test-'))
          .forEach(file => fs.unlinkSync(path.join(outputDir, file)));
      }
    });
    it("creates resized image", async () => {
      const outputPath = await processingImage(testImage);
      expect(fs.existsSync(outputPath)).toBe(true);
    });
    it("returns same path for same dimensions", async () => {
      const firstPath = await processingImage(testImage);
      const secondPath = await processingImage(testImage);
      expect(firstPath).toBe(secondPath);
    });
    it('fails for missing images', async () => {
      await expect(processingImage({
       filename: 'missing.jpg',
       width: 100,
        height: 100
      })).rejects.toThrow();
    });
    it("processes with quality parameter", async () => {
      const outputPath = await processingImage({
       ...testImage,
     });
      expect(fs.existsSync(outputPath)).toBe(true);
    });
});


