import { ProgressStatusEnum } from "../Enum/progress-status-enum.enum";

export interface ProgressStatus {
  status: ProgressStatusEnum;
  percentage?: number;
}
