
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PassportDetails } from '@/types/visa';

interface Step4Props {
  data: PassportDetails;
  onUpdate: (data: PassportDetails) => void;
}

const Step4PassportDetails: React.FC<Step4Props> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof PassportDetails, value: string | boolean) => {
    onUpdate({ ...data, [field]: value });
  };

  const travelDocumentTypes = [
    'Passport', 'Travel Document', 'Refugee Travel Document', 'Emergency Travel Document', 'Temporary Passport'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <Label htmlFor="travelDocumentType">Type of Travel Document *</Label>
          <Select value={data.travelDocumentType} onValueChange={(value) => handleChange('travelDocumentType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {travelDocumentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="issuingAuthority">Issuing Authority/Type *</Label>
          <Input
            id="issuingAuthority"
            value={data.issuingAuthority}
            onChange={(e) => handleChange('issuingAuthority', e.target.value)}
            placeholder="Enter issuing authority"
          />
        </div>

        <div className="space-y-2">
          <Label>Date of Issue *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !data.dateOfIssue && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.dateOfIssue ? format(new Date(data.dateOfIssue), "PPP") : "Pick issue date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.dateOfIssue ? new Date(data.dateOfIssue) : undefined}
                onSelect={(date) => handleChange('dateOfIssue', date ? date.toISOString().split('T')[0] : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Date of Expiry *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !data.dateOfExpiry && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.dateOfExpiry ? format(new Date(data.dateOfExpiry), "PPP") : "Pick expiry date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.dateOfExpiry ? new Date(data.dateOfExpiry) : undefined}
                onSelect={(date) => handleChange('dateOfExpiry', date ? date.toISOString().split('T')[0] : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isFirstPassport"
              checked={data.isFirstPassport}
              onCheckedChange={(checked) => handleChange('isFirstPassport', checked as boolean)}
            />
            <Label htmlFor="isFirstPassport">This is my first passport</Label>
          </div>
        </div>

        {!data.isFirstPassport && (
          <>
            <div className="space-y-2">
              <Label htmlFor="previousPassportNumber">Previous Passport Number</Label>
              <Input
                id="previousPassportNumber"
                value={data.previousPassportNumber || ''}
                onChange={(e) => handleChange('previousPassportNumber', e.target.value)}
                placeholder="Enter previous passport number"
              />
            </div>

            <div className="space-y-2">
              <Label>Previous Passport Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !data.previousPassportExpiry && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.previousPassportExpiry ? format(new Date(data.previousPassportExpiry), "PPP") : "Pick expiry date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={data.previousPassportExpiry ? new Date(data.previousPassportExpiry) : undefined}
                    onSelect={(date) => handleChange('previousPassportExpiry', date ? date.toISOString().split('T')[0] : '')}
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

export default Step4PassportDetails;