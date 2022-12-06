import { User } from '../auth/interface';

export interface CreatePostResponse {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: true;
  lostAddress: string;
  hometown: string;
  lostTime: Date;
  relationship: string;
  photos: string;
  relevantPosts: string;
  shareCount: string;
}

export interface FaceDescriptor {
  id: string;
  descriptor: Descriptor;
}

export interface Address {
  region: string;
  state: string;
  commune: string;
  hamlet: string;
}

export interface Post {
  hometown: Address;
  missingAddress: Address;
  id: number;
  userId: number;
  title: string;
  fullName: string;
  nickname: string;
  dateOfBirth: string;
  gender: number;
  relevantPosts?: any;
  photos: string[];
  relationship?: any;
  description: string;
  shareCount: number;
  updatedAt: Date;
  createdAt: Date;
  missingTime: Date;
  owner: User;
  found: boolean;
  similar?: number;
  user: User;
}
export interface Descriptor {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
  16: number;
  17: number;
  18: number;
  19: number;
  20: number;
  21: number;
  22: number;
  23: number;
  24: number;
  25: number;
  26: number;
  27: number;
  28: number;
  29: number;
  30: number;
  31: number;
  32: number;
  33: number;
  34: number;
  35: number;
  36: number;
  37: number;
  38: number;
  39: number;
  40: number;
  41: number;
  42: number;
  43: number;
  44: number;
  45: number;
  46: number;
  47: number;
  48: number;
  49: number;
  50: number;
  51: number;
  52: number;
  53: number;
  54: number;
  55: number;
  56: number;
  57: number;
  58: number;
  59: number;
  60: number;
  61: number;
  62: number;
  63: number;
  64: number;
  65: number;
  66: number;
  67: number;
  68: number;
  69: number;
  70: number;
  71: number;
  72: number;
  73: number;
  74: number;
  75: number;
  76: number;
  77: number;
  78: number;
  79: number;
  80: number;
  81: number;
  82: number;
  83: number;
  84: number;
  85: number;
  86: number;
  87: number;
  88: number;
  89: number;
  90: number;
  91: number;
  92: number;
  93: number;
  94: number;
  95: number;
  96: number;
  97: number;
  98: number;
  99: number;
  100: number;
  101: number;
  102: number;
  103: number;
  104: number;
  105: number;
  106: number;
  107: number;
  108: number;
  109: number;
  110: number;
  111: number;
  112: number;
  113: number;
  114: number;
  115: number;
  116: number;
  117: number;
  118: number;
  119: number;
  120: number;
  121: number;
  122: number;
  123: number;
  124: number;
  125: number;
  126: number;
  127: number;
}
