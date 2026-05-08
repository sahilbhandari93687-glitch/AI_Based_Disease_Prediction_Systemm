import React, { useState, useEffect } from 'react';
import { diseaseApi } from '../services/api';
import { Search, CheckCircle, AlertTriangle, Info, RefreshCw, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { generatePDF } from '../utils/pdfGenerator';

const SymptomChecker: React.FC = () => {
  const { t } = useTranslation();
  const [allSymptoms, setAllSymptoms] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('random_forest');

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await diseaseApi.getSymptoms();
        setAllSymptoms(response.data);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    };
    fetchSymptoms();
  }, []);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);
    try {
      const response = await diseaseApi.predict(selectedSymptoms, model);
      setPrediction(response.data);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (prediction) {
      generatePDF(prediction, selectedSymptoms);
    }
  };

  const reset = () => {
    setSelectedSymptoms([]);
    setPrediction(null);
    setSearchTerm('');
  };

  const filteredSymptoms = allSymptoms.filter(s => 
    s.toLowerCase().replace(/_/g, ' ').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <Activity className="text-blue-600" /> {t('checker')}
      </h2>

      {!prediction ? (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Info size={20} /> How it works
              </h3>
              <ul className="text-sm text-blue-800 space-y-3 list-disc pl-4">
                <li>Search and select your current symptoms.</li>
                <li>The more symptoms you provide, the more accurate the prediction.</li>
                <li>Our AI model will analyze patterns based on medical data.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Model Settings</h3>
              <select 
                value={model} 
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="random_forest">Random Forest (Recommended)</option>
                <option value="decision_tree">Decision Tree</option>
                <option value="naive_bayes">Naive Bayes</option>
              </select>
            </div>
          </div>

          {/* Main Selection Area */}
          <div className="md:col-span-2 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder={t('symptom_search_placeholder')}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm min-h-[400px]">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                <span>Available Symptoms</span>
                <span className="text-blue-600 font-bold">{selectedSymptoms.length} Selected</span>
              </h3>
              
              <div className="flex flex-wrap gap-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredSymptoms.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      selectedSymptoms.includes(s)
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {s.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>

              {filteredSymptoms.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <AlertTriangle size={48} className="mb-2" />
                  <p>No symptoms found matching "{searchTerm}"</p>
                </div>
              )}
            </div>

            <button
              onClick={handlePredict}
              disabled={selectedSymptoms.length === 0 || loading}
              className={`w-full py-4 rounded-xl text-lg font-bold transition shadow-lg ${
                selectedSymptoms.length === 0 || loading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="animate-spin" /> {t('analyzing')}
                </span>
              ) : t('run_analysis')}
            </button>
          </div>
        </div>
      ) : (
        /* Result View */
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className={`p-8 text-white ${
            prediction.risk_level === 'High' ? 'bg-red-600' : prediction.risk_level === 'Medium' ? 'bg-yellow-500' : 'bg-green-600'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-50 font-semibold mb-1 uppercase tracking-wider">{t('top_prediction')}</p>
                <h3 className="text-4xl font-black">{prediction.disease}</h3>
                {prediction.message && <p className="mt-2 text-white/90 font-medium italic">{prediction.message}</p>}
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm text-center">
                <p className="text-xs uppercase font-bold text-blue-50">{t('confidence')}</p>
                <p className="text-2xl font-bold">{(prediction.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-500" /> {t('symptoms_matched')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      {s.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-orange-500" /> {t('risk_assessment')}
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Severity Level:</span>
                    <span className={`font-bold ${
                      prediction.risk_level === 'High' ? 'text-red-600' : 'text-gray-800'
                    }`}>{prediction.risk_level}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        prediction.risk_level === 'High' ? 'bg-red-600' : 'bg-blue-600'
                      }`} 
                      style={{ width: `${prediction.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Info className="text-blue-600" /> {t('rec_actions')}
              </h4>
              <p className="text-blue-800 mb-4">
                Based on your symptoms, you might have <span className="font-bold underline">{prediction.disease}</span>. 
                Please note that this is an AI-driven estimation and not a final medical diagnosis.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-blue-200">
                  <p className="font-bold text-blue-900 text-sm mb-1">Precautions</p>
                  <ul className="text-sm text-blue-700 list-disc pl-4">
                    {prediction.precautions?.map((p: string, i: number) => <li key={i}>{p}</li>) || <li>Consult a doctor</li>}
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-200">
                  <p className="font-bold text-blue-900 text-sm mb-1">Dietary Tips</p>
                  <ul className="text-sm text-blue-700 list-disc pl-4">
                    {prediction.diet?.map((d: string, i: number) => <li key={i}>{d}</li>) || <li>Maintain balanced diet</li>}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={reset}
                className="flex-1 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition"
              >
                {t('new_assessment')}
              </button>
              <button 
                onClick={handleDownload}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
              >
                {t('download_report')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
