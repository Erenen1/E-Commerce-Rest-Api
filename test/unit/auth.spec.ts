import { sha256Hash, compareHash } from "../../src/helpers/authentication"


test("sha256Hash function must create hash", () => {
    const data: string = "merhabaDunya";
    const hashedData: string = sha256Hash(data);
    console.log(hashedData)
    // expect(hashedData).toBe
})