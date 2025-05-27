
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VisaFormData } from '@/types/visa';
import ProgressBar from './ProgressBar';
import Step1TravelInfo from './Step1TravelInfo';
import Step2PersonalInfo from './Step2PersonalInfo';
import Step3VisaHistory from './Step3VisaHistory';
import Step4PassportDetails from './Step4PassportDetails';
import Step5EmploymentEducation from './Step5EmploymentEducation';
import Step6TravelCompanions from './Step6TravelCompanions';
import Step7ContactHost from './Step7ContactHost';
import Step8PersonalStatus from './Step8PersonalStatus';
import Step9DependantChildren from './Step9DependantChildren';
import Step10AgentAssistance from './Step10AgentAssistance';
import Step11Declaration from './Step11Declaration';
import FormPreview from './FormPreview';

const TOTAL_STEPS = 11;

const initialFormData: VisaFormData = {
  travelInfo: {
    countryOfNationality: '',
    reasonForTravel: '',
    visaType: 'short',
    journeyType: 'single',
    purposeOfTravel: '',
    passportType: '',
    passportNumber: '',
    proposedEntryDate: '',
    proposedExitDate: ''
  },
  personalInfo: {
    surname: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'male',
    countryOfBirth: '',
    currentLocation: '',
    addressLine1: '',
    addressLine2: '',
    contactPhone: '',
    emailAddress: ''
  },
  visaHistory: {
    lengthOfResidenceYears: '',
    lengthOfResidenceMonths: '',
    previousVisaApplications: '',
    visaRefusals: '',
    criminalConvictions: '',
    hasBeenRefused: 'no',
    hasConvictions: 'no'
  },
  passportDetails: {
    passportNumber: '',
    travelDocumentType: '',
    issuingAuthority: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    isFirstPassport: true
  },
  employmentEducation: {
    employmentStatus: '',
    studentStatus: ''
  },
  travelCompanions: {
    travelingWithOthers: false,
    companions: []
  },
  contactHost: {
    hostName: '',
    hostAddress: '',
    hostPhone: '',
    hostEmail: '',
    relationshipToHost: '',
    hostType: ''
  },
  personalStatus: {
    maritalStatus: ''
  },
  dependantChildren: {
    numberOfChildren: '0',
    children: []
  },
  agentAssistance: {
    usingAgent: false
  },
  declaration: {
    agreeToDeclaration: false,
    signature: '',
    dateOfDeclaration: ''
  }
};

const VisaForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<VisaFormData>(initialFormData);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('visaFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem('visaFormData', JSON.stringify(formData));
    toast({
      title: "Form Saved",
      description: "Your progress has been saved locally.",
    });
  };

  const updateFormData = (section: keyof VisaFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowPreview(true);
    }
  };

  const prevStep = () => {
    if (showPreview) {
      setShowPreview(false);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setShowPreview(false);
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted",
      description: "Your visa application has been submitted successfully.",
    });
    localStorage.removeItem('visaFormData');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1TravelInfo data={formData.travelInfo} onUpdate={(data) => updateFormData('travelInfo', data)} />;
      case 2:
        return <Step2PersonalInfo data={formData.personalInfo} onUpdate={(data) => updateFormData('personalInfo', data)} />;
      case 3:
        return <Step3VisaHistory data={formData.visaHistory} onUpdate={(data) => updateFormData('visaHistory', data)} />;
      case 4:
        return <Step4PassportDetails data={formData.passportDetails} onUpdate={(data) => updateFormData('passportDetails', data)} />;
      case 5:
        return <Step5EmploymentEducation data={formData.employmentEducation} onUpdate={(data) => updateFormData('employmentEducation', data)} />;
      case 6:
        return <Step6TravelCompanions data={formData.travelCompanions} onUpdate={(data) => updateFormData('travelCompanions', data)} />;
      case 7:
        return <Step7ContactHost data={formData.contactHost} onUpdate={(data) => updateFormData('contactHost', data)} />;
      case 8:
        return <Step8PersonalStatus data={formData.personalStatus} onUpdate={(data) => updateFormData('personalStatus', data)} />;
      case 9:
        return <Step9DependantChildren data={formData.dependantChildren} onUpdate={(data) => updateFormData('dependantChildren', data)} />;
      case 10:
        return <Step10AgentAssistance data={formData.agentAssistance} onUpdate={(data) => updateFormData('agentAssistance', data)} />;
      case 11:
        return <Step11Declaration data={formData.declaration} onUpdate={(data) => updateFormData('declaration', data)} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  const stepTitles = [
    'Travel Information',
    'Personal Information',
    'Visa History & Permissions',
    'Passport Details',
    'Employment & Education',
    'Travel Companions',
    'Contact/Host in Ireland',
    'Personal Status',
    'Dependant Children',
    'Agent/Agency Assistance',
    'Declaration'
  ];

  if (showPreview) {
    return (
      <FormPreview
        formData={formData}
        onEdit={goToStep}
        onBack={prevStep}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
              Visa Application Form
            </CardTitle>
            <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            <h2 className="text-xl font-semibold text-gray-700 mt-4">
              Step {currentStep}: {stepTitles[currentStep - 1]}
            </h2>
          </CardHeader>
          <CardContent className="p-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6"
              >
                Previous
              </Button>
              
              <div className="space-x-4">
                <Button
                  variant="secondary"
                  onClick={saveToLocalStorage}
                  className="px-6"
                >
                  Save Progress
                </Button>
                
                <Button
                  onClick={nextStep}
                  className="px-6"
                >
                  {currentStep === TOTAL_STEPS ? 'Review Application' : 'Next'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisaForm;