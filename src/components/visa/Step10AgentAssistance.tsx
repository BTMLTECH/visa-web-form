
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { AgentAssistance } from '@/types/visa';

interface Step10Props {
  data: AgentAssistance;
  onUpdate: (data: AgentAssistance) => void;
}

const Step10AgentAssistance: React.FC<Step10Props> = ({ data, onUpdate }) => {
  const handleUsingAgentChange = (checked: boolean) => {
    onUpdate({
      ...data,
      usingAgent: checked,
      agentName: checked ? data.agentName : undefined,
      agentAddress: checked ? data.agentAddress : undefined,
      agentPhone: checked ? data.agentPhone : undefined,
      agentEmail: checked ? data.agentEmail : undefined
    });
  };

  const handleChange = (field: keyof AgentAssistance, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usingAgent"
            checked={data.usingAgent}
            onCheckedChange={handleUsingAgentChange}
          />
          <Label htmlFor="usingAgent">Are you using an agent or agency to assist with this application?</Label>
        </div>

        {data.usingAgent && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Agent/Agency Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="agentName">Agent/Agency Name *</Label>
                <Input
                  id="agentName"
                  value={data.agentName || ''}
                  onChange={(e) => handleChange('agentName', e.target.value)}
                  placeholder="Enter agent or agency name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agentPhone">Agent Phone Number *</Label>
                <Input
                  id="agentPhone"
                  value={data.agentPhone || ''}
                  onChange={(e) => handleChange('agentPhone', e.target.value)}
                  placeholder="Enter agent's phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agentEmail">Agent Email Address *</Label>
                <Input
                  id="agentEmail"
                  type="email"
                  value={data.agentEmail || ''}
                  onChange={(e) => handleChange('agentEmail', e.target.value)}
                  placeholder="Enter agent's email"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="agentAddress">Agent/Agency Address *</Label>
                <Textarea
                  id="agentAddress"
                  value={data.agentAddress || ''}
                  onChange={(e) => handleChange('agentAddress', e.target.value)}
                  placeholder="Enter complete agent/agency address"
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step10AgentAssistance;