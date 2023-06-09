import { faker } from "@faker-js/faker";

const f1_name = faker.system.commonFileName();
const f2_name = faker.system.commonFileName();
const f1_id = faker.string.uuid();
const f2_id = faker.string.uuid();
const f1_size = faker.number.float();
const f2_size = faker.number.float();
const f1_sizeUnit = 'KB';
const f2_sizeUnit = 'MB';

const f3_name = faker.system.commonFileName();
const f3_id = faker.string.uuid();
const f3_size = faker.number.float();
const f3_sizeUnit = 'MB';

export const fileData = [
  { id: f1_id, name: f1_name, size: f1_size, sizeUnit: f1_sizeUnit },
  { id: f2_id, name: f2_name, size: f2_size, sizeUnit: f2_sizeUnit },
];

export const fileDataWithUpload = [
  ...fileData,
  { id: f3_id, name: f3_name, size: f3_size, sizeUnit: f3_sizeUnit, isUploading: true },
];