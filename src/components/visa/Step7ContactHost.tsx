
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ContactHost } from '@/types/visa';

interface Step7Props {
  data: ContactHost;
  onUpdate: (data: ContactHost) => void;
}

const Step7ContactHost: React.FC<Step7Props> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof ContactHost, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const relationshipOptions = [
    'Family member', 'Friend', 'Business contact', 'Educational institution', 
    'Hotel/Accommodation', 'Tour operator', 'Employer', 'Other'
  ];

  const hostTypes = [
    'Individual', 'Family', 'Business/Company', 'Educational institution', 
    'Hotel/Accommodation', 'Government organization', 'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="hostName">Host/Contact Name *</Label>
          <Input
            id="hostName"
            value={data.hostName}
            onChange={(e) => handleChange('hostName', e.target.value)}
            placeholder="Enter host's name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hostPhone">Host Phone Number *</Label>
          <Input
            id="hostPhone"
            value={data.hostPhone}
            onChange={(e) => handleChange('hostPhone', e.target.value)}
            placeholder="Enter host's phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hostEmail">Host Email Address *</Label>
          <Input
            id="hostEmail"
            type="email"
            value={data.hostEmail}
            onChange={(e) => handleChange('hostEmail', e.target.value)}
            placeholder="Enter host's email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="relationshipToHost">Relationship to Host *</Label>
          <Select value={data.relationshipToHost} onValueChange={(value) => handleChange('relationshipToHost', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              {relationshipOptions.map((relationship) => (
                <SelectItem key={relationship} value={relationship}>
                  {relationship}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hostType">Type of Host *</Label>
          <Select value={data.hostType} onValueChange={(value) => handleChange('hostType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select host type" />
            </SelectTrigger>
            <SelectContent>
              {hostTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="hostAddress">Host Address in Ireland *</Label>
          <Textarea
            id="hostAddress"
            value={data.hostAddress}
            onChange={(e) => handleChange('hostAddress', e.target.value)}
            placeholder="Enter complete address in Ireland"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Step7ContactHost;