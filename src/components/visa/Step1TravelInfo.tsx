
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TravelInfo } from '@/types/visa';
import CountryDropdown from './CountryDropdown';

interface Step1Props {
  data: TravelInfo;
  onUpdate: (data: TravelInfo) => void;
}

const Step1TravelInfo: React.FC<Step1Props> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof TravelInfo, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const reasonForTravelOptions = [
    'Tourism', 'Business', 'Employment', 'Study', 'Family Visit', 'Medical Treatment', 'Transit'
  ];

  const employmentVisaTypes = [
    'Work Permit', 'Critical Skills', 'General Employment', 'Seasonal Work', 'Intra-Company Transfer'
  ];

  const studyVisaTypes = [
    'Language Course', 'University Degree', 'Vocational Training', 'Research', 'Exchange Program'
  ];

  const passportTypes = [
    'Ordinary Passport', 'Diplomatic Passport', 'Service Passport', 'Emergency Travel Document', 'Refugee Travel Document'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nationality">Country of Nationality *</Label>
          <CountryDropdown
            value={data.countryOfNationality}
            onValueChange={(value) => handleChange('countryOfNationality', value)}
            placeholder="Select your nationality"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reasonForTravel">Reason for Travel *</Label>
          <Select value={data.reasonForTravel} onValueChange={(value) => handleChange('reasonForTravel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select reason for travel" />
            </SelectTrigger>
            <SelectContent>
              {reasonForTravelOptions.map((reason) => (
                <SelectItem key={reason} value={reason}>
                  {reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {data.reasonForTravel === 'Employment' && (
          <div className="space-y-2">
            <Label htmlFor="employmentVisaType">Type of Employment Visa</Label>
            <Select value={data.employmentVisaType || ''} onValueChange={(value) => handleChange('employmentVisaType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select employment visa type" />
              </SelectTrigger>
              <SelectContent>
                {employmentVisaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {data.reasonForTravel === 'Study' && (
          <div className="space-y-2">
            <Label htmlFor="studyVisaType">Type of Study</Label>
            <Select value={data.studyVisaType || ''} onValueChange={(value) => handleChange('studyVisaType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select study type" />
              </SelectTrigger>
              <SelectContent>
                {studyVisaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Type of Visa/Preclearance *</Label>
          <RadioGroup value={data.visaType} onValueChange={(value: 'short' | 'long') => handleChange('visaType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="short" id="short" />
              <Label htmlFor="short">Short stay (up to 90 days)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="long" id="long" />
              <Label htmlFor="long">Long stay (over 90 days)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Journey Type *</Label>
          <RadioGroup value={data.journeyType} onValueChange={(value: 'single' | 'multiple') => handleChange('journeyType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single entry</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multiple" id="multiple" />
              <Label htmlFor="multiple">Multiple entry</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purposeOfTravel">Purpose of Travel *</Label>
          <Input
            id="purposeOfTravel"
            value={data.purposeOfTravel}
            onChange={(e) => handleChange('purposeOfTravel', e.target.value)}
            placeholder="Describe the purpose of your travel"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passportType">Passport Type *</Label>
          <Select value={data.passportType} onValueChange={(value) => handleChange('passportType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select passport type" />
            </SelectTrigger>
            <SelectContent>
              {passportTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passportNumber">Passport/Travel Document Number *</Label>
          <Input
            id="passportNumber"
            value={data.passportNumber}
            onChange={(e) => handleChange('passportNumber', e.target.value)}
            placeholder="Enter passport number"
          />
        </div>

        <div className="space-y-2">
          <Label>Proposed Date of Entry *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !data.proposedEntryDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.proposedEntryDate ? format(new Date(data.proposedEntryDate), "PPP") : "Pick entry date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.proposedEntryDate ? new Date(data.proposedEntryDate) : undefined}
                onSelect={(date) => handleChange('proposedEntryDate', date ? date.toISOString().split('T')[0] : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Proposed Date of Exit *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !data.proposedExitDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.proposedExitDate ? format(new Date(data.proposedExitDate), "PPP") : "Pick exit date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.proposedExitDate ? new Date(data.proposedExitDate) : undefined}
                onSelect={(date) => handleChange('proposedExitDate', date ? date.toISOString().split('T')[0] : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Step1TravelInfo;