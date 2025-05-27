
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EmploymentEducation } from '@/types/visa';

interface Step5Props {
  data: EmploymentEducation;
  onUpdate: (data: EmploymentEducation) => void;
}

const Step5EmploymentEducation: React.FC<Step5Props> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof EmploymentEducation, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const employmentStatuses = [
    'Unemployed', 'Employed', 'Self-employed', 'Student', 'Retired', 'Other'
  ];

  const studentStatuses = [
    'Not a student', 'Full-time student', 'Part-time student', 'Exchange student'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="employmentStatus">Current Employment Status *</Label>
          <Select value={data.employmentStatus} onValueChange={(value) => handleChange('employmentStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select employment status" />
            </SelectTrigger>
            <SelectContent>
              {employmentStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {data.employmentStatus === 'Employed' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="employerName">Employer Name</Label>
              <Input
                id="employerName"
                value={data.employerName || ''}
                onChange={(e) => handleChange('employerName', e.target.value)}
                placeholder="Enter employer name"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="employerAddress">Employer Address</Label>
              <Textarea
                id="employerAddress"
                value={data.employerAddress || ''}
                onChange={(e) => handleChange('employerAddress', e.target.value)}
                placeholder="Enter employer address"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={data.jobTitle || ''}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
                placeholder="Enter job title"
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="studentStatus">Student Status *</Label>
          <Select value={data.studentStatus} onValueChange={(value) => handleChange('studentStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select student status" />
            </SelectTrigger>
            <SelectContent>
              {studentStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {data.studentStatus !== 'Not a student' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="schoolName">School/Institution Name</Label>
              <Input
                id="schoolName"
                value={data.schoolName || ''}
                onChange={(e) => handleChange('schoolName', e.target.value)}
                placeholder="Enter school name"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="schoolAddress">School Address</Label>
              <Textarea
                id="schoolAddress"
                value={data.schoolAddress || ''}
                onChange={(e) => handleChange('schoolAddress', e.target.value)}
                placeholder="Enter school address"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseOfStudy">Course of Study</Label>
              <Input
                id="courseOfStudy"
                value={data.courseOfStudy || ''}
                onChange={(e) => handleChange('courseOfStudy', e.target.value)}
                placeholder="Enter course of study"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Step5EmploymentEducation;