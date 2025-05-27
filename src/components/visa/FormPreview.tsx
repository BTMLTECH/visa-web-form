
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, FileText, Send } from 'lucide-react';
import { VisaFormData } from '@/types/visa';

interface FormPreviewProps {
  formData: VisaFormData;
  onEdit: (step: number) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const FormPreview: React.FC<FormPreviewProps> = ({ formData, onEdit, onBack, onSubmit }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  const sections = [
    {
      title: 'Travel Information',
      step: 1,
      data: formData.travelInfo,
      fields: [
        { label: 'Country of Nationality', value: formData.travelInfo.countryOfNationality },
        { label: 'Reason for Travel', value: formData.travelInfo.reasonForTravel },
        { label: 'Employment Visa Type', value: formData.travelInfo.employmentVisaType },
        { label: 'Study Visa Type', value: formData.travelInfo.studyVisaType },
        { label: 'Visa Type', value: formData.travelInfo.visaType },
        { label: 'Journey Type', value: formData.travelInfo.journeyType },
        { label: 'Purpose of Travel', value: formData.travelInfo.purposeOfTravel },
        { label: 'Passport Type', value: formData.travelInfo.passportType },
        { label: 'Passport Number', value: formData.travelInfo.passportNumber },
        { label: 'Proposed Entry Date', value: formatDate(formData.travelInfo.proposedEntryDate) },
        { label: 'Proposed Exit Date', value: formatDate(formData.travelInfo.proposedExitDate) }
      ]
    },
    {
      title: 'Personal Information',
      step: 2,
      data: formData.personalInfo,
      fields: [
        { label: 'Surname', value: formData.personalInfo.surname },
        { label: 'First Name', value: formData.personalInfo.firstName },
        { label: 'Last Name', value: formData.personalInfo.lastName },
        { label: 'Date of Birth', value: formatDate(formData.personalInfo.dateOfBirth) },
        { label: 'Gender', value: formData.personalInfo.gender },
        { label: 'Country of Birth', value: formData.personalInfo.countryOfBirth },
        { label: 'Current Location', value: formData.personalInfo.currentLocation },
        { label: 'Address Line 1', value: formData.personalInfo.addressLine1 },
        { label: 'Address Line 2', value: formData.personalInfo.addressLine2 },
        { label: 'Contact Phone', value: formData.personalInfo.contactPhone },
        { label: 'Email Address', value: formData.personalInfo.emailAddress }
      ]
    },
    {
      title: 'Visa History & Permissions',
      step: 3,
      data: formData.visaHistory,
      fields: [
        { label: 'Length of Residence (Years)', value: formData.visaHistory.lengthOfResidenceYears },
        { label: 'Length of Residence (Months)', value: formData.visaHistory.lengthOfResidenceMonths },
        { label: 'Has Been Refused', value: formData.visaHistory.hasBeenRefused },
        { label: 'Has Convictions', value: formData.visaHistory.hasConvictions },
        { label: 'Previous Visa Applications', value: formData.visaHistory.previousVisaApplications },
        { label: 'Visa Refusals', value: formData.visaHistory.visaRefusals },
        { label: 'Criminal Convictions', value: formData.visaHistory.criminalConvictions }
      ]
    },
    {
      title: 'Passport Details',
      step: 4,
      data: formData.passportDetails,
      fields: [
        { label: 'Passport Number', value: formData.passportDetails.passportNumber },
        { label: 'Travel Document Type', value: formData.passportDetails.travelDocumentType },
        { label: 'Issuing Authority', value: formData.passportDetails.issuingAuthority },
        { label: 'Date of Issue', value: formatDate(formData.passportDetails.dateOfIssue) },
        { label: 'Date of Expiry', value: formatDate(formData.passportDetails.dateOfExpiry) },
        { label: 'Is First Passport', value: formData.passportDetails.isFirstPassport ? 'Yes' : 'No' },
        { label: 'Previous Passport Number', value: formData.passportDetails.previousPassportNumber },
        { label: 'Previous Passport Expiry', value: formatDate(formData.passportDetails.previousPassportExpiry || '') }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <FileText className="w-8 h-8 mr-3" />
              Application Preview
            </CardTitle>
            <p className="text-gray-600">Please review your information before submitting</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              {sections.map((section) => (
                <Card key={section.step} className="border-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(section.step)}
                      className="flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.fields.map((field, index) => (
                        field.value && (
                          <div key={index} className="space-y-1">
                            <dt className="text-sm font-medium text-gray-600">{field.label}</dt>
                            <dd className="text-sm text-gray-900">{field.value || 'Not provided'}</dd>
                          </div>
                        )
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Additional sections for remaining steps */}
              {formData.employmentEducation.employmentStatus && (
                <Card className="border-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">Employment & Education</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => onEdit(5)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-600">Employment Status</dt>
                        <dd className="text-sm text-gray-900">{formData.employmentEducation.employmentStatus}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">Student Status</dt>
                        <dd className="text-sm text-gray-900">{formData.employmentEducation.studentStatus}</dd>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {formData.declaration.agreeToDeclaration && (
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">Declaration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-green-700">
                        ✓ Applicant has agreed to the declaration
                      </p>
                      <p className="text-sm text-gray-600">
                        Electronic Signature: {formData.declaration.signature}
                      </p>
                      <p className="text-sm text-gray-600">
                        Date: {formatDate(formData.declaration.dateOfDeclaration)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={onBack} className="px-8">
                Back to Form
              </Button>
              
              <Button 
                onClick={onSubmit} 
                className="px-8 bg-green-600 hover:bg-green-700"
                disabled={!formData.declaration.agreeToDeclaration}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormPreview;