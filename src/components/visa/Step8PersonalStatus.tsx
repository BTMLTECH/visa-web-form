
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PersonalStatus } from '@/types/visa';
import CountryDropdown from './CountryDropdown';

interface Step8Props {
  data: PersonalStatus;
  onUpdate: (data: PersonalStatus) => void;
}

const Step8PersonalStatus: React.FC<Step8Props> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof PersonalStatus, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const maritalStatuses = [
    'Single', 'Married', 'Civil Partnership', 'Divorced', 'Separated', 'Widowed'
  ];

  const showSpouseFields = data.maritalStatus === 'Married' || data.maritalStatus === 'Civil Partnership';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status *</Label>
          <Select value={data.maritalStatus} onValueChange={(value) => handleChange('maritalStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              {maritalStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showSpouseFields && (
          <>
            <div className="space-y-2">
              <Label htmlFor="spouseName">Spouse/Partner Name</Label>
              <Input
                id="spouseName"
                value={data.spouseName || ''}
                onChange={(e) => handleChange('spouseName', e.target.value)}
                placeholder="Enter spouse/partner's name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseNationality">Spouse/Partner Nationality</Label>
              <CountryDropdown
                value={data.spouseNationality || ''}
                onValueChange={(value) => handleChange('spouseNationality', value)}
                placeholder="Select spouse's nationality"
              />
            </div>

            <div className="space-y-2">
              <Label>Spouse/Partner Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !data.spouseDateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.spouseDateOfBirth ? format(new Date(data.spouseDateOfBirth), "PPP") : "Pick spouse's birth date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={data.spouseDateOfBirth ? new Date(data.spouseDateOfBirth) : undefined}
                    onSelect={(date) => handleChange('spouseDateOfBirth', date ? date.toISOString().split('T')[0] : '')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Step8PersonalStatus;