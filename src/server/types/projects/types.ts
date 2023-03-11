export interface ProjectData {
  name: string;
  website: string;
  twitter: string;
  platforms: string;
  monthlyUsers: string;
  avatar: string;
  shortDescription: string;
  description: string;
}

export interface UserId extends Request {
  userId: string;
}

export type ProjectsData = ProjectData[];
