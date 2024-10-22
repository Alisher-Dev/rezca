export interface IProduct {
  id: number;
  title: string;
  desc: string;
  category: string;
  date: Date;
  video: IVideo[];
  image: string;
}

export interface IVideo {
  id: number;
  video: string;
  title: string;
}

export interface IProps {
  limit?: boolean;
}
