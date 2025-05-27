
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { VisaHistory } from '@/types/visa';

interface Step3Props {
  data: VisaHistory;
  onUpdate: (data: VisaHistory) => void;
}

const Step3VisaHistory: React.FC<Step3Props> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof VisaHistory, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const years = Array.from({ length: 99 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="lengthOfResidenceYears">Length of Residence - Years</Label>
          <Select value={data.lengthOfResidenceYears} onValueChange={(value) => handleChange('lengthOfResidenceYears', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select years" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year} year{year !== '1' ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lengthOfResidenceMonths">Length of Residence - Months</Label>
          <Select value={data.lengthOfResidenceMonths} onValueChange={(value) => handleChange('lengthOfResidenceMonths', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select months" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month} month{month !== '1' ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Have you been refused a visa to any country? *</Label>
          <RadioGroup value={data.hasBeenRefused} onValueChange={(value: 'yes' | 'no') => handleChange('hasBeenRefused', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="refused-no" />
              <Label htmlFor="refused-no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="refused-yes" />
              <Label htmlFor="refused-yes">Yes</Label>
            </div>
          </RadioGroup>
        </div>

        {data.hasBeenRefused === 'yes' && (
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="visaRefusals">Details of Visa Refusals</Label>
            <Textarea
              id="visaRefusals"
              value={data.visaRefusals}
              onChange={(e) => handleChange('visaRefusals', e.target.value)}
              placeholder="Please provide details of any visa refusals"
              rows={4}
            />
          </div>
        )}

        <div className="space-y-2 md:col-span-2">
          <Label>Do you have any criminal convictions? *</Label>
          <RadioGroup value={data.hasConvictions} onValueChange={(value: 'yes' | 'no') => handleChange('hasConvictions', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="convictions-no" />
              <Label htmlFor="convictions-no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="convictions-yes" />
              <Label htmlFor="convictions-yes">Yes</Label>
            </div>
          </RadioGroup>
        </div>

        {data.hasConvictions === 'yes' && (
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="criminalConvictions">Details of Criminal Convictions</Label>
            <Textarea
              id="criminalConvictions"
              value={data.criminalConvictions}
              onChange={(e) => handleChange('criminalConvictions', e.target.value)}
              placeholder="Please provide details of any criminal convictions"
              rows={4}
            />
          </div>
        )}

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="previousVisaApplications">Previous Visa Applications</Label>
          <Textarea
            id="previousVisaApplications"
            value={data.previousVisaApplications}
            onChange={(e) => handleChange('previousVisaApplications', e.target.value)}
            placeholder="Please provide details of any previous visa applications"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3VisaHistory;