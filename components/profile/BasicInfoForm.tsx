import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormData } from "./types";

interface BasicInfoFormProps {
  formData: FormData;
  onChange: (name: string, value: string) => void;
}

export const BasicInfoForm = ({ formData, onChange }: BasicInfoFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            First Name
          </label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className="py-[18px] px-5 text-lg"
          />
        </div>
        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            Birthday
          </label>
          <Input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            className="py-[18px] px-5 text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            Sex
          </label>
          <Select
            value={formData.sex}
            onValueChange={(value) => onChange("sex", value)}
          >
            <SelectTrigger className="py-[18px] px-5 text-lg">
              <SelectValue placeholder="Select your sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            Pronouns
          </label>
          <Select
            value={formData.pronouns}
            onValueChange={(value) => onChange("pronouns", value)}
          >
            <SelectTrigger className="py-[18px] px-5 text-lg">
              <SelectValue placeholder="Select your pronouns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="he/him">He/Him</SelectItem>
              <SelectItem value="she/her">She/Her</SelectItem>
              <SelectItem value="they/them">They/Them</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            Height (ft)
          </label>
          <Input
            type="number"
            step="0.1"
            name="height"
            value={formData.height}
            onChange={(e) => onChange("height", e.target.value)}
            className="py-[18px] px-5 text-lg"
          />
        </div>
        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            Weight (kg)
          </label>
          <Input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={(e) => onChange("weight", e.target.value)}
            className="py-[18px] px-5 text-lg"
          />
        </div>
      </div>

      <div>
        <label className="block font-outfit font-semibold text-foreground mb-2">
          Job Title
        </label>
        <Input
          name="jobTitle"
          value={formData.jobTitle}
          onChange={(e) => onChange("jobTitle", e.target.value)}
          className="py-[18px] px-5 text-lg"
        />
      </div>
    </div>
  );
};
