import React, { useState } from 'react';
import { ClipboardList, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

type FormData = {
  allergies: string;
  medications: string;
  surgeries: string;
  chronicConditions: string[];
  mentalHealthConditions: string[];
  currentSymptoms: string;
  sleepQuality: string;
  stressLevel: string;
  mentalHealthTreatment: string;
  vaccinationHistory: string;
  smokingStatus: string;
  alcoholConsumption: string;
  exerciseFrequency: string;
  familyHistory: string;
  height: string;
  weight: string;
  bloodType: string;
  dietaryRestrictions: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
};

const chronicConditionsList = [
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'Asthma',
  'Arthritis',
  'Cancer',
  'Thyroid Disorder',
  'Other',
];

const mentalHealthConditionsList = [
  'Anxiety',
  'Depression',
  'PTSD',
  'Bipolar Disorder',
  'ADHD',
  'OCD',
  'Eating Disorder',
  'Other',
];

type Section = {
  id: string;
  title: string;
};

const sections: Section[] = [
  { id: 'basic', title: 'Basic Information' },
  { id: 'current', title: 'Current Health Status' },
  { id: 'medical', title: 'Medical Information' },
  { id: 'mental', title: 'Mental Health' },
  { id: 'lifestyle', title: 'Lifestyle & Habits' },
  { id: 'emergency', title: 'Emergency Contact' },
];

export default function MedicalHistory() {
  const [formData, setFormData] = useState<FormData>({
    allergies: '',
    medications: '',
    surgeries: '',
    chronicConditions: [],
    mentalHealthConditions: [],
    currentSymptoms: '',
    sleepQuality: '',
    stressLevel: '',
    mentalHealthTreatment: '',
    vaccinationHistory: '',
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseFrequency: '',
    familyHistory: '',
    height: '',
    weight: '',
    bloodType: '',
    dietaryRestrictions: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
  });

  const [openSections, setOpenSections] = useState<string[]>(['basic']);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormData] as object,
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleConditions = (condition: string, type: 'chronicConditions' | 'mentalHealthConditions') => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(condition)
        ? prev[type].filter(c => c !== condition)
        : [...prev[type], condition],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-100">Medical History Questionnaire</h1>
            </div>
            
            <div className="mt-4 bg-gray-700/50 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm text-gray-200">
                    Please fill out this form accurately. Your medical history helps us provide you with better care.
                    Complete each section at your own pace - your progress is automatically saved.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="divide-y divide-gray-700">
            {sections.map((section) => (
              <div key={section.id} className="p-6 md:p-8">
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h2 className="text-xl font-semibold text-gray-100">{section.title}</h2>
                  {openSections.includes(section.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {openSections.includes(section.id) && (
                  <div className="mt-6 space-y-6">
                    {section.id === 'basic' && (
                      <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-200">Height</label>
                            <input
                              type="text"
                              name="height"
                              value={formData.height}
                              onChange={handleChange}
                              placeholder="e.g., 5'10''"
                              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200">Weight</label>
                            <input
                              type="text"
                              name="weight"
                              value={formData.weight}
                              onChange={handleChange}
                              placeholder="e.g., 150 lbs"
                              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200">Blood Type</label>
                            <select
                              name="bloodType"
                              value={formData.bloodType}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                            >
                              <option value="">Select Blood Type</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {section.id === 'current' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Current Symptoms</label>
                          <textarea
                            name="currentSymptoms"
                            value={formData.currentSymptoms}
                            onChange={handleChange}
                            rows={3}
                            placeholder="List any current symptoms or health concerns"
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Allergies</label>
                          <textarea
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            rows={2}
                            placeholder="List any allergies to medications, foods, or other substances"
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                      </>
                    )}

                    {section.id === 'medical' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Current Medications</label>
                          <textarea
                            name="medications"
                            value={formData.medications}
                            onChange={handleChange}
                            rows={3}
                            placeholder="List all current medications and supplements"
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">Chronic Conditions</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {chronicConditionsList.map((condition) => (
                              <div key={condition} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`chronic-${condition}`}
                                  checked={formData.chronicConditions.includes(condition)}
                                  onChange={() => handleConditions(condition, 'chronicConditions')}
                                  className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded bg-gray-700"
                                />
                                <label htmlFor={`chronic-${condition}`} className="ml-2 text-sm text-gray-200">
                                  {condition}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Past Surgeries</label>
                          <textarea
                            name="surgeries"
                            value={formData.surgeries}
                            onChange={handleChange}
                            rows={2}
                            placeholder="List any past surgeries with dates"
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Vaccination History</label>
                          <textarea
                            name="vaccinationHistory"
                            value={formData.vaccinationHistory}
                            onChange={handleChange}
                            rows={2}
                            placeholder="List your vaccination history and dates"
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                      </>
                    )}

                    {section.id === 'mental' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">Mental Health Conditions</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {mentalHealthConditionsList.map((condition) => (
                              <div key={condition} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`mental-${condition}`}
                                  checked={formData.mentalHealthConditions.includes(condition)}
                                  onChange={() => handleConditions(condition, 'mentalHealthConditions')}
                                  className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded bg-gray-700"
                                />
                                <label htmlFor={`mental-${condition}`} className="ml-2 text-sm text-gray-200">
                                  {condition}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-200">Sleep Quality</label>
                            <select
                              name="sleepQuality"
                              value={formData.sleepQuality}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                            >
                              <option value="">Select Sleep Quality</option>
                              <option value="excellent">Excellent (7-9 hours)</option>
                              <option value="good">Good (6-7 hours)</option>
                              <option value="fair">Fair (5-6 hours)</option>
                              <option value="poor">Poor (Less than 5 hours)</option>
                              <option value="irregular">Irregular Pattern</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200">Stress Level</label>
                            <select
                              name="stressLevel"
                              value={formData.stressLevel}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                            >
                              <option value="">Select Stress Level</option>
                              <option value="low">Low</option>
                              <option value="moderate">Moderate</option>
                              <option value="high">High</option>
                              <option value="severe">Severe</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Mental Health Treatment History</label>
                          <textarea
                            name="mentalHealthTreatment"
                            value={formData.mentalHealthTreatment}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Describe any past or current mental health treatments, therapy, or counseling"
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                      </>
                    )}

                    {section.id === 'lifestyle' && (
                      <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-200">Smoking Status</label>
                            <select
                              name="smokingStatus"
                              value={formData.smokingStatus}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                            >
                              <option value="">Select Status</option>
                              <option value="never">Never Smoked</option>
                              <option value="former">Former Smoker</option>
                              <option value="current">Current Smoker</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200">Alcohol Consumption</label>
                            <select
                              name="alcoholConsumption"
                              value={formData.alcoholConsumption}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                            >
                              <option value="">Select Frequency</option>
                              <option value="never">Never</option>
                              <option value="occasional">Occasional</option>
                              <option value="moderate">Moderate</option>
                              <option value="frequent">Frequent</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200">Exercise Frequency</label>
                            <select
                              name="exerciseFrequency"
                              value={formData.exerciseFrequency}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                            >
                              <option value="">Select Frequency</option>
                              <option value="sedentary">Sedentary</option>
                              <option value="light">Light (1-2 days/week)</option>
                              <option value="moderate">Moderate (3-4 days/week)</option>
                              <option value="active">Active (5+ days/week)</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Dietary Restrictions</label>
                          <textarea
                            name="dietaryRestrictions"
                            value={formData.dietaryRestrictions}
                            onChange={handleChange}
                            rows={2}
                            placeholder="List any dietary restrictions or preferences"
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                      </>
                    )}

                    {section.id === 'emergency' && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Name</label>
                          <input
                            type="text"
                            name="emergencyContact.name"
                            value={formData.emergencyContact.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Relationship</label>
                          <input
                            type="text"
                            name="emergencyContact.relationship"
                            value={formData.emergencyContact.relationship}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-200">Phone</label>
                          <input
                            type="tel"
                            name="emergencyContact.phone"
                            value={formData.emergencyContact.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="p-6 md:p-8">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
              >
                Submit Medical History
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}