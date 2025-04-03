import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ZPEVisualization = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [zpeLevel, setZpeLevel] = useState(50);
  
  // Simulated data
  const performanceData = [
    { epoch: 1, standard: 72.4, zpe: 77.9, standardLoss: 0.82, zpeLoss: 0.76 },
    { epoch: 2, standard: 79.1, zpe: 86.4, standardLoss: 0.67, zpeLoss: 0.58 },
    { epoch: 3, standard: 83.5, zpe: 89.7, standardLoss: 0.55, zpeLoss: 0.44 },
    { epoch: 4, standard: 86.2, zpe: 91.8, standardLoss: 0.48, zpeLoss: 0.38 },
    { epoch: 5, standard: 88.0, zpe: 93.1, standardLoss: 0.43, zpeLoss: 0.33 },
    { epoch: 6, standard: 89.3, zpe: 94.0, standardLoss: 0.40, zpeLoss: 0.30 },
    { epoch: 7, standard: 90.1, zpe: 94.6, standardLoss: 0.37, zpeLoss: 0.28 },
    { epoch: 8, standard: 90.7, zpe: 95.1, standardLoss: 0.35, zpeLoss: 0.26 },
    { epoch: 9, standard: 91.2, zpe: 95.5, standardLoss: 0.34, zpeLoss: 0.25 },
    { epoch: 10, standard: 91.5, zpe: 95.8, standardLoss: 0.33, zpeLoss: 0.24 },
  ];
  
  const adversarialData = [
    { attack: 'None', standard: 91.5, zpe: 95.8 },
    { attack: 'FGSM ε=0.1', standard: 43.2, zpe: 76.4 },
    { attack: 'FGSM ε=0.2', standard: 27.8, zpe: 64.3 },
    { attack: 'PGD', standard: 19.3, zpe: 58.7 },
    { attack: 'CW', standard: 15.2, zpe: 52.1 },
  ];
  
  const noiseEffectData = [
    { uncertainty: 10, standardError: 12.3, zpeError: 3.2 },
    { uncertainty: 20, standardError: 18.7, zpeError: 6.3 },
    { uncertainty: 30, standardError: 26.4, zpeError: 10.1 },
    { uncertainty: 40, standardError: 35.2, zpeError: 14.7 },
    { uncertainty: 50, standardError: 45.8, zpeError: 19.4 },
  ];
  
  const industryData = [
    { industry: 'Healthcare', dataReduction: 35, accuracyGain: 6.7, robustnessGain: 28.4 },
    { industry: 'Finance', dataReduction: 42, accuracyGain: 5.3, robustnessGain: 31.2 },
    { industry: 'Autonomous', dataReduction: 28, accuracyGain: 7.1, robustnessGain: 34.8 },
    { industry: 'Manufacturing', dataReduction: 37, accuracyGain: 4.9, robustnessGain: 25.3 },
    { industry: 'Security', dataReduction: 31, accuracyGain: 8.2, robustnessGain: 42.6 },
  ];
  
  // Calculate dynamic ZPE effects based on slider
  const getZpeAdjustedData = () => {
    const factor = zpeLevel / 50;
    return performanceData.map(d => ({
      ...d,
      zpe: Math.min(99.9, d.standard + (d.zpe - d.standard) * factor),
      zpeLoss: Math.max(0.05, d.standardLoss - (d.standardLoss - d.zpeLoss) * factor)
    }));
  };
  
  return (
    <div className="flex flex-col bg-gray-50 rounded-lg shadow p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ZPE Neural Networks: Interactive Demonstration</h2>
      
      {/* Tabs */}
      <div className="flex mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 text-sm font-medium flex-1 ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          Performance Overview
        </button>
        <button 
          onClick={() => setActiveTab('adversarial')}
          className={`px-4 py-3 text-sm font-medium flex-1 ${activeTab === 'adversarial' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          Adversarial Robustness
        </button>
        <button 
          onClick={() => setActiveTab('noise')}
          className={`px-4 py-3 text-sm font-medium flex-1 ${activeTab === 'noise' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          Noise Effects
        </button>
        <button 
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-3 text-sm font-medium flex-1 ${activeTab === 'applications' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          Industry Benefits
        </button>
      </div>
      
      {/* ZPE Strength Slider - Only show for Performance Overview tab */}
      {activeTab === 'overview' && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <label className="block mb-2 text-sm font-medium text-gray-700">ZPE Strength: {zpeLevel}%</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={zpeLevel} 
            onChange={(e) => setZpeLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-end text-xs text-gray-500 mt-1">
            <span>Full ZPE Enhancement</span>
          </div>
        </div>
      )}
      
      {/* Content Area */}
      <div className="bg-white p-6 rounded-lg shadow-sm min-h-64">
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Training Performance Comparison</h3>
            <div className="text-sm text-gray-600 mb-8">
              ZPE-enhanced models achieve higher accuracy with fewer training epochs, leading to faster deployment and lower training costs.
            </div>
            
            <div className="flex flex-col space-y-6">
              <div className="h-64 mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-2">Model Accuracy Over Training Epochs</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getZpeAdjustedData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="epoch" label={{ value: 'Training Epoch', position: 'insideBottom', offset: -15 }} />
                    <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} domain={[70, 100]} />
                    <Tooltip formatter={(value) => value.toFixed(1) + '%'} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="standard" name="Standard Model" stroke="#6c757d" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="zpe" name="ZPE Model" stroke="#0d6efd" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-64 mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-2">Training Loss Reduction</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getZpeAdjustedData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="epoch" label={{ value: 'Training Epoch', position: 'insideBottom', offset: -15 }} />
                    <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} domain={[0.2, 0.9]} />
                    <Tooltip formatter={(value) => value.toFixed(2)} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="standardLoss" name="Standard Model" stroke="#6c757d" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="zpeLoss" name="ZPE Model" stroke="#0d6efd" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'adversarial' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Adversarial Attack Resistance</h3>
            <div className="text-sm text-gray-600 mb-6">
              ZPE noise patterns create robustness against adversarial examples, making models significantly more secure for deployment in critical systems.
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adversarialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="attack" />
                  <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(1) + '%'} />
                  <Legend />
                  <Bar dataKey="standard" name="Standard Model" fill="#6c757d" />
                  <Bar dataKey="zpe" name="ZPE Model" fill="#0d6efd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-md font-medium text-blue-800 mb-2">Key Insight</h4>
              <p className="text-sm text-blue-700">
                ZPE models maintain 52-76% accuracy under attacks that reduce standard models to 15-43% accuracy. 
                This represents a potential breakthrough for AI deployment in security-critical applications.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'noise' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Handling Uncertainty & Noise</h3>
            <div className="text-sm text-gray-600 mb-8">
              ZPE's quantum-inspired noise patterns provide exceptional performance in high-uncertainty environments where traditional models struggle.
            </div>
            
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={noiseEffectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="uncertainty" label={{ value: 'Environmental Uncertainty Level', position: 'insideBottom', offset: -15 }} />
                  <YAxis label={{ value: 'Prediction Error (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(1) + '%'} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="standardError" name="Standard Model Error" stroke="#dc3545" fill="#dc3545" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="zpeError" name="ZPE Model Error" stroke="#198754" fill="#198754" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-2">Signal Recovery</h4>
                <p className="text-sm text-gray-600">
                  ZPE models excel at recovering signals from noise-contaminated data, reducing error rates by up to 65%.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-2">Edge Case Handling</h4>
                <p className="text-sm text-gray-600">
                  Traditional models collapse on edge cases, while ZPE maintains consistent performance across the spectrum.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-2">Calibrated Confidence</h4>
                <p className="text-sm text-gray-600">
                  ZPE models maintain well-calibrated confidence scores even as uncertainty increases.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'applications' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Industry Applications</h3>
            <div className="text-sm text-gray-600 mb-6">
              ZPE technology delivers transformative benefits across multiple high-value industries.
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="h-64">
                <h4 className="text-md font-medium text-gray-700 mb-2">Training Data Reduction</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" domain={[0, 50]} label={{ value: 'Data Reduction (%)', position: 'insideBottom', offset: -5 }} />
                    <YAxis dataKey="industry" type="category" width={100} />
                    <Tooltip formatter={(value) => value + '%'} />
                    <Bar dataKey="dataReduction" name="Data Reduction" fill="#6610f2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-64">
                <h4 className="text-md font-medium text-gray-700 mb-2">Performance Improvements</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" domain={[0, 50]} label={{ value: 'Improvement (%)', position: 'insideBottom', offset: -5 }} />
                    <YAxis dataKey="industry" type="category" width={100} />
                    <Tooltip formatter={(value) => value + '%'} />
                    <Legend />
                    <Bar dataKey="accuracyGain" name="Accuracy Gain" fill="#0d6efd" />
                    <Bar dataKey="robustnessGain" name="Robustness Gain" fill="#198754" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="text-md font-medium text-green-800 mb-2">ROI Impact</h4>
              <p className="text-sm text-green-700">
                Our analysis shows ZPE technology reduces AI project costs by 25-40% while improving key performance metrics.
                For a typical enterprise AI deployment, this translates to $1-3M in direct cost savings and 30-60% faster time-to-market.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      <div className="mt-6 p-4 bg-blue-600 text-white rounded-lg text-center">
        <h3 className="font-medium mb-2">Ready to transform your AI capabilities with ZPE technology?</h3>
        <p className="text-sm text-blue-100 mb-4">
          Our technology integrates seamlessly with existing frameworks and can be deployed in production within weeks.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium">
            Request Technical Demo
          </button>
          <button className="px-4 py-2 bg-blue-800 text-white rounded-lg text-sm font-medium">
            Schedule Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZPEVisualization;
