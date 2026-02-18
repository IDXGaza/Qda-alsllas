
import React from 'react';
import { BookOpen, ExternalLink, Info, AlertTriangle, ShieldCheck, Scale, Clock } from 'lucide-react';

export const Guide: React.FC = () => {
  const references = [
    {
      name: "السيد علي السيستاني (دام ظله)",
      quote: "من فاتته فريضة وجب عليه قضاؤها إذا لم تكن فريضة الجمعة... ولا يجب الترتيب في قضاء الفوائت غير الأدائية إلا ما كانت مترتبة بالأصل كالظهرين والعشائين.",
      url: "https://www.sistani.org/arabic/book/13/593/",
      source: "المسائل المنتخبة - أحكام القضاء"
    },
    {
      name: "السيد علي الخامنئي (دام ظله)",
      quote: "يجب قضاء الصلوات اليومية التي تركت في وقتها، ويجوز الإتيان بالقضاء في أي وقت من الليل أو النهار.",
      url: "https://www.leader.ir/ar/book/18",
      source: "أجوبة الاستفتاءات - الصلاة"
    },
    {
      name: "السيد أبو القاسم الخوئي (قدس سره)",
      quote: "يجب قضاء ما فات من الصلوات اليومية، وإذا شك في فوات شيء لم يجب عليه القضاء، نعم لو علم بالفوات وشك في الكمية اكتفى بالمقدار المتيقن.",
      url: "http://www.alkhoei.org/",
      source: "منهاج الصالحين"
    },
    {
      name: "السيد محمد حسين فضل الله (قدس سره)",
      quote: "الصلاة الفائتة دين لله في ذمة المكلف، والقضاء يسقط هذا الدين. ولا يشترط في القضاء أن يكون في وقت الصلاة المماثلة.",
      url: "http://bayynat.org.lb/",
      source: "فقه الشريعة"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 pb-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-emerald-900">دليل القضاء</h2>
        <p className="text-slate-500 font-medium">أحكام وفتاوى صلاة القضاء وفق المذهب الجعفري</p>
      </div>

      {/* قسم القواعد العامة */}
      <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="text-emerald-600" size={24} />
          <h3 className="text-xl font-bold text-slate-800">قواعد أساسية</h3>
        </div>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
            <p className="text-slate-600 text-sm leading-relaxed">
              <strong>وجوب القضاء:</strong> يجب قضاء كل صلاة فات وقتها عمداً أو سهواً أو جهلاً، باستثناء ما فات الحائض والنفساء والمغمى عليه (بغير فعله).
            </p>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
            <p className="text-slate-600 text-sm leading-relaxed">
              <strong>الترتيب:</strong> يجب الترتيب بين الظهر والعصر وبين المغرب والعشاء في القضاء، كما هو الحال في الأداء.
            </p>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
            <p className="text-slate-600 text-sm leading-relaxed">
              <strong>القدر المتيقن:</strong> إذا لم يعرف المكلف عدد ما فاته، يكفي قضاء المقدار الذي يتيقن معه براءة ذمته (الأخذ بالأقل).
            </p>
          </li>
        </ul>
      </section>

      {/* قسم المراجع */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <BookOpen className="text-emerald-600" size={24} />
          <h3 className="text-xl font-bold text-slate-800">فتاوى المراجع العظام</h3>
        </div>
        {references.map((ref, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-black text-emerald-800">{ref.name}</h4>
              <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-slate-300 group-hover:text-emerald-500 transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>
            <p className="text-slate-600 text-sm italic leading-relaxed mb-4 border-r-2 border-emerald-100 pr-4">
              "{ref.quote}"
            </p>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              المصدر: {ref.source}
            </div>
          </div>
        ))}
      </section>

      {/* قسم كيفية الحساب */}
      <section className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute -top-4 -left-4 opacity-10 rotate-12">
          <Clock size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Info size={24} className="text-emerald-400" />
            <h3 className="text-xl font-bold">كيف تحسب فتراتك؟</h3>
          </div>
          <div className="space-y-4 text-emerald-100 text-sm">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="text-emerald-400 flex-shrink-0" size={20} />
              <p>يبدأ التكليف للبنت بإكمال 9 سنوات قمرية، وللولد بإكمال 15 سنة قمرية أو ظهور علامات البلوغ.</p>
            </div>
            <div className="flex gap-3 items-start">
              <AlertTriangle className="text-amber-400 flex-shrink-0" size={20} />
              <p>تُطرح أيام الحيض والنفاس من إجمالي أيام السنة عند حساب قضاء المرأة.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 bg-slate-100 rounded-2xl border border-slate-200">
        <p className="text-slate-500 text-[10px] font-bold">
          ملاحظة: هذا التطبيق وسيلة مساعدة للتنظيم فقط، ويُرجع دائماً للموقع الرسمي للمرجع في تفاصيل الأحكام الدقيقة.
        </p>
      </div>
    </div>
  );
};
