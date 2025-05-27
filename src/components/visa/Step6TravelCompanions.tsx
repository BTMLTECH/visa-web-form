
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { TravelCompanions, TravelCompanion } from '@/types/visa';

interface Step6Props {
  data: TravelCompanions;
  onUpdate: (data: TravelCompanions) => void;
}

const Step6TravelCompanions: React.FC<Step6Props> = ({ data, onUpdate }) => {
  const handleTravelingChange = (checked: boolean) => {
    onUpdate({
      ...data,
      travelingWithOthers: checked,
      companions: checked ? data.companions : []
    });
  };

  const addCompanion = () => {
    onUpdate({
      ...data,
      companions: [...data.companions, { name: '', relationship: '' }]
    });
  };

  const removeCompanion = (index: number) => {
    const newCompanions = data.companions.filter((_, i) => i !== index);
    onUpdate({
      ...data,
      companions: newCompanions
    });
  };

  const updateCompanion = (index: number, field: keyof TravelCompanion, value: string) => {
    const newCompanions = data.companions.map((companion, i) =>
      i === index ? { ...companion, [field]: value } : companion
    );
    onUpdate({
      ...data,
      companions: newCompanions
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="travelingWithOthers"
            checked={data.travelingWithOthers}
            onCheckedChange={handleTravelingChange}
          />
          <Label htmlFor="travelingWithOthers">Will you be traveling with others?</Label>
        </div>

        {data.travelingWithOthers && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Travel Companions</h3>
              <Button onClick={addCompanion} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Companion
              </Button>
            </div>

            {data.companions.map((companion, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Companion {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCompanion(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`companion-name-${index}`}>Full Name *</Label>
                    <Input
                      id={`companion-name-${index}`}
                      value={companion.name}
                      onChange={(e) => updateCompanion(index, 'name', e.target.value)}
                      placeholder="Enter companion's name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`companion-relationship-${index}`}>Relationship *</Label>
                    <Input
                      id={`companion-relationship-${index}`}
                      value={companion.relationship}
                      onChange={(e) => updateCompanion(index, 'relationship', e.target.value)}
                      placeholder="e.g., Spouse, Child, Friend"
                    />
                  </div>
                </div>
              </div>
            ))}

            {data.companions.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No companions added. Click "Add Companion" to add travel companions.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6TravelCompanions;