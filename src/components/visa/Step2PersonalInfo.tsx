
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PersonalInfo } from '@/types/visa';
import CountryDropdown from './CountryDropdown';

interface Step2Props {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

const Step2PersonalInfo: React.FC<Step2Props> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="surname">Surname *</Label>
          <Input
            id="surname"
            value={data.surname}
            onChange={(e) => handleChange('surname', e.target.value)}
            placeholder="Enter your surname"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter your first name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter your last name"
          />
        </div>

        <div className="space-y-2">
          <Label>Date of Birth *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !data.dateOfBirth && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.dateOfBirth ? format(new Date(data.dateOfBirth), "PPP") : "Pick your birth date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.dateOfBirth ? new Date(data.dateOfBirth) : undefined}
                onSelect={(date) => handleChange('dateOfBirth', date ? date.toISOString().split('T')[0] : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Gender *</Label>
          <RadioGroup value={data.gender} onValueChange={(value: 'male' | 'female' | 'other') => handleChange('gender', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="countryOfBirth">Country of Birth *</Label>
          <CountryDropdown
            value={data.countryOfBirth}
            onValueChange={(value) => handleChange('countryOfBirth', value)}
            placeholder="Select country of birth"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentLocation">Current Location *</Label>
          <CountryDropdown
            value={data.currentLocation}
            onValueChange={(value) => handleChange('currentLocation', value)}
            placeholder="Select current country"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine1">Address Line 1 *</Label>
          <Input
            id="addressLine1"
            value={data.addressLine1}
            onChange={(e) => handleChange('addressLine1', e.target.value)}
            placeholder="Enter street address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            id="addressLine2"
            value={data.addressLine2}
            onChange={(e) => handleChange('addressLine2', e.target.value)}
            placeholder="Apartment, suite, etc. (optional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone *</Label>
          <Input
            id="contactPhone"
            value={data.contactPhone}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailAddress">Email Address *</Label>
          <Input
            id="emailAddress"
            type="email"
            value={data.emailAddress}
            onChange={(e) => handleChange('emailAddress', e.target.value)}
            placeholder="Enter email address"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2PersonalInfo;