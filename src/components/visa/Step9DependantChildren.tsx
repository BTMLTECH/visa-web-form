
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DependantChildren, Child } from '@/types/visa';
import CountryDropdown from './CountryDropdown';

interface Step9Props {
  data: DependantChildren;
  onUpdate: (data: DependantChildren) => void;
}

const Step9DependantChildren: React.FC<Step9Props> = ({ data, onUpdate }) => {
  const handleNumberChange = (value: string) => {
    const numberOfChildren = parseInt(value);
    const currentChildren = data.children.length;
    
    let newChildren = [...data.children];
    
    if (numberOfChildren > currentChildren) {
      // Add new children
      for (let i = currentChildren; i < numberOfChildren; i++) {
        newChildren.push({ name: '', dateOfBirth: '', nationality: '' });
      }
    } else if (numberOfChildren < currentChildren) {
      // Remove children
      newChildren = newChildren.slice(0, numberOfChildren);
    }
    
    onUpdate({
      numberOfChildren: value,
      children: newChildren
    });
  };

  const updateChild = (index: number, field: keyof Child, value: string) => {
    const newChildren = data.children.map((child, i) =>
      i === index ? { ...child, [field]: value } : child
    );
    onUpdate({
      ...data,
      children: newChildren
    });
  };

  const numberOfChildrenOptions = Array.from({ length: 11 }, (_, i) => i.toString());

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="numberOfChildren">Number of Dependant Children *</Label>
        <Select value={data.numberOfChildren} onValueChange={handleNumberChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select number of children" />
          </SelectTrigger>
          <SelectContent>
            {numberOfChildrenOptions.map((num) => (
              <SelectItem key={num} value={num}>
                {num} {num === '1' ? 'child' : 'children'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {parseInt(data.numberOfChildren) > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Children Information</h3>
          
          {data.children.map((child, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <h4 className="font-medium">Child {index + 1}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`child-name-${index}`}>Full Name *</Label>
                  <Input
                    id={`child-name-${index}`}
                    value={child.name}
                    onChange={(e) => updateChild(index, 'name', e.target.value)}
                    placeholder="Enter child's name"
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
                          !child.dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {child.dateOfBirth ? format(new Date(child.dateOfBirth), "PPP") : "Pick birth date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={child.dateOfBirth ? new Date(child.dateOfBirth) : undefined}
                        onSelect={(date) => updateChild(index, 'dateOfBirth', date ? date.toISOString().split('T')[0] : '')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`child-nationality-${index}`}>Nationality *</Label>
                  <CountryDropdown
                    value={child.nationality}
                    onValueChange={(value) => updateChild(index, 'nationality', value)}
                    placeholder="Select child's nationality"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step9DependantChildren;