
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Declaration } from '@/types/visa';

interface Step11Props {
  data: Declaration;
  onUpdate: (data: Declaration) => void;
}

const Step11Declaration: React.FC<Step11Props> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof Declaration, value: string | boolean) => {
    onUpdate({ ...data, [field]: value });
  };

  React.useEffect(() => {
    // Set current date if not already set
    if (!data.dateOfDeclaration) {
      handleChange('dateOfDeclaration', new Date().toISOString().split('T')[0]);
    }
  }, [data.dateOfDeclaration]);

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Declaration</h3>
          <div className="space-y-4 text-sm">
            <p>
              I declare that the information I have given in this application is complete and correct. 
              I understand that any false or misleading information may result in refusal of my application 
              or cancellation of a visa already granted.
            </p>
            <p>
              I undertake to observe the laws of Ireland and not to become a burden on public funds. 
              I understand that I may be refused entry to Ireland even if I hold a valid visa.
            </p>
            <p>
              I consent to the disclosure of information contained in this form to other Government 
              Departments, Agencies and Third Parties where necessary for the proper consideration of 
              my application and the administration of visa and immigration matters.
            </p>
            <p>
              I understand that if granted a visa, it does not guarantee entry to Ireland and that 
              the final decision rests with the Immigration Officer at the port of entry.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToDeclaration"
            checked={data.agreeToDeclaration}
            onCheckedChange={(checked) => handleChange('agreeToDeclaration', checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="agreeToDeclaration" className="text-sm leading-relaxed">
            I have read, understood, and agree to the above declaration. I confirm that all information 
            provided in this application is true and accurate to the best of my knowledge.
          </Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="signature">Electronic Signature (Full Name) *</Label>
            <Input
              id="signature"
              value={data.signature}
              onChange={(e) => handleChange('signature', e.target.value)}
              placeholder="Type your full name as electronic signature"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfDeclaration">Date of Declaration</Label>
            <Input
              id="dateOfDeclaration"
              type="date"
              value={data.dateOfDeclaration}
              onChange={(e) => handleChange('dateOfDeclaration', e.target.value)}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step11Declaration;