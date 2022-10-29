export interface Address {
  region?: string;
  state?: string;
  commune?: string;
  hamlet?: string;
}

interface DescriptorInfo {
  descriptor: Descriptor;
  id: string;
}
export interface PostData {
  title: string;
  fullName: string;
  nickname: string;
  dateOfBirth?: string;
  gender: boolean | null;
  hometown?: Address;
  missingAddress?: Address;
  missingTime?: string;
  photos?: string[];
  description: string;
  descriptors?: DescriptorInfo[];
}
