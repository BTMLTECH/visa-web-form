import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Ireland Visa Application
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Complete your Irish visa application online with our comprehensive, step-by-step form. 
            Secure, efficient, and designed to guide you through every requirement.
          </p>
          <Link to="/visa-application">
            <Button size="lg" className="text-lg px-8 py-4">
              Start Your Application
              <FileText className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-lg">11-Step Process</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprehensive form covering all visa requirements from travel info to declaration
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your data is stored locally and encrypted. Complete privacy and security guaranteed
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Save Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Auto-save functionality lets you complete your application at your own pace
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-lg">User Friendly</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Intuitive design with clear navigation, validation, and helpful guidance
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Begin?</CardTitle>
              <CardDescription className="text-lg">
                Start your Irish visa application now. The process typically takes 20-30 minutes to complete.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/visa-application">
                <Button size="lg" className="w-full md:w-auto">
                  Begin Application Process
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
