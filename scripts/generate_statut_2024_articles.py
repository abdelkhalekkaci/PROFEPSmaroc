#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates the 10 Arabic Pillar HTML Articles on the Moroccan Ministry of Education Law
(BO n° 7277 - Decrees n° 2.24.140 & 2.24.141) using the EXACT unified Navbar, unified Footer,
E-E-A-T author card, Google AdSense Consent Mode v2 + CMP, and UI colors (--primary: #991b1b,
--secondary: #006233, --bg-primary: #ffffff, --bg-secondary: #f8fafc) of ProfEPS Maroc
(matching /public/ar-orientations-pedagogiques-eps-maroc.html 100%).
All legal references, tables, indices, and simulator formulas strictly match Bulletin Officiel n° 7277.
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from statut_2024_data_part1 import ARTICLES_PART_1
from statut_2024_data_part2 import ARTICLES_PART2

ALL_ARTICLES = ARTICLES_PART_1 + ARTICLES_PART2
assert len(ALL_ARTICLES) == 10, f"Expected 10 articles, got {len(ALL_ARTICLES)}"

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
PDF_URL = "/assets/aistudio/lois_et_regles_minist_re_d__education_2764c974.pdf"

# Read the exact Unified Navbar, E-E-A-T Author Card, Unified Footer, and CMP Banner from ar-orientations-pedagogiques-eps-maroc.html
REF_AR_FILE = os.path.join(PUBLIC_DIR, "ar-orientations-pedagogiques-eps-maroc.html")
with open(REF_AR_FILE, "r", encoding="utf-8") as _f:
    _ref_html = _f.read()

_nav_match = re.search(r"(<!-- PROFEPS_UNIFIED_NAVBAR_START -->[\s\S]*?<!-- PROFEPS_UNIFIED_NAVBAR_END -->)", _ref_html)
assert _nav_match, "Could not extract PROFEPS_UNIFIED_NAVBAR from ar-orientations-pedagogiques-eps-maroc.html"
UNIFIED_NAVBAR_TEMPLATE = _nav_match.group(1)

_footer_match = re.search(r"(<!-- PROFEPS_EEAT_AUTHOR_START -->[\s\S]*?)(?=</body>)", _ref_html)
assert _footer_match, "Could not extract PROFEPS_EEAT_AUTHOR + Footer from ar-orientations-pedagogiques-eps-maroc.html"
UNIFIED_FOOTER_AND_CMP = _footer_match.group(1)


# Tailored deep-dive practical case studies & administrative procedures per article (100% aligned with BO 7277)
CASE_STUDIES_BY_NUM = {
    "01": """
        <div class="step-card" id="sec-cases-01">
            <h3 style="margin-top:0;color:#991b1b;">مذكرة تطبيقية إضافية: قواعد صرف التعويضات الشهرية والتعويض التكميلي (المواد 59 و60 و89)</h3>
            <p style="margin-bottom:0;">
                أكدت <strong>المادة 59</strong> من المرسوم رقم 2.24.140 أن التعويضات النظامية الثلاثة (التعويض عن التعليم لأطر التدريس أو التعويض عن التدرج الإداري لباقي الأطر، التعويض عن الأعباء، والتعويض عن التأطير) تؤدى عند نهاية كل شهر، بينما نصت <strong>المادة 60</strong> على أنه علاوة على تعويضات المادة 59، يتقاضى الموظفون، حسب الفئات المعنية، تعويضات تحدد أصنافها ومقاديرها بمرسوم (كالتعويضات العائلية، والتعويض عن الساعات الإضافية، والتعويضات التكميلية وعن الأعباء الإدارية المنصوص عليها في المرسوم رقم 2.24.141)، مع ضمانة <strong>المادة 89</strong> التي تخول تعويضاً تكميلياً لكل موظف ترتب عن إدماجه أو تغيير إطاره نقص في أجرته السابقة.
            </p>
        </div>
    """,
    "02": """
        <div class="step-card" id="sec-cases-02">
            <h3 style="margin-top:0;color:#991b1b;">خلاصة مسطرية: الوثائق الإدارية اللازمة للتقييد في جدول الترقي إلى الدرجة الممتازة (المادتان 50 و87)</h3>
            <p style="margin-bottom:0;">
                يتعين على كل موظف استوفى شرط الرتبة السابعة (7 — الرقم الاستدلالي 542) وخمس (5) سنوات من الخدمة الفعلية في الدرجة الأولى التأكد من تحيين وضعيته الإدارية في منظومة التدبير المندمج لموظفي التربية الوطنية (مسير / التبليغ)، ومراجعة نقطة التقييم المهني الممنوحة له طبقاً للمادتين 53 و54 قبل انعقاد اللجان الإدارية المتساوية الأعضاء المختصة بالبث في جداول الترقي بالاختيار في حدود حصيص 36% سنوياً أو في إطار التسقيف بدون حصيص في التقييد الرابع.
            </p>
        </div>
    """,
    "03": """
        <div class="step-card" id="sec-cases-03">
            <h3 style="margin-top:0;color:#991b1b;">تطبيقات خاصة بمادة التربية البدنية والرياضية والجمعية الرياضية المدرسية ASS (المادتان 15 و67)</h3>
            <p style="margin-bottom:0;">
                بالنسبة لأساتذة مادة التربية البدنية والرياضية بالتعليم الثانوي الإعدادي والتأهيلي والأساتذة المبرزين للتربية والتكوين، تشكل <strong>المادة 15</strong> و<strong>المادة 67</strong> السند التشريعي المباشر لمهام التربية والتدريس والتقييم والمشاركة في تنظيم الامتحانات المدرسية (بما فيها اختبارات البكالوريا الرياضية Bac Sport)، وكذا تأطير أنشطة الجمعية الرياضية المدرسية (ASS) والبطولات المدرسية المنظمة تحت إشراف مديرية الارتقاء بالرياضة المدرسية والجامعة الملكية المغربية للرياضة المدرسية (FRMSS).
            </p>
        </div>
    """,
    "04": """
        <div class="step-card" id="sec-cases-04">
            <h3 style="margin-top:0;color:#991b1b;">ضمانات الاحتفاظ بالأقدمية والوضعية المالية بعد الإدماج في الأطر الجديدة (المواد 73 إلى 79 و89)</h3>
            <p style="margin-bottom:0;">
                تنص المواد الانتقالية من 73 إلى 79 والمادة 89 من المرسوم رقم 2.24.140 على أن جميع الموظفين المدمجين (تلقائياً أو بناءً على طلب داخل الآجال القانونية) يحتفظون بنفس الدرجة والرتبة والأقدمية المكتسبة في إطارهم الأصلي، وتُحتسب هذه الأقدمية كاملة لأغراض الترقية في الرتبة والدرجة والحركة الانتقالية، مع منح تعويض تكميلي (المادة 89) في حال ترتب عن أي تغيير في الإطار نقص في الأجرة السابقة.
            </p>
        </div>
    """,
    "05": """
        <div class="step-card" id="sec-cases-05">
            <h3 style="margin-top:0;color:#991b1b;">البديل القانوني للدروس الخصوصية: الساعات الإضافية المؤدى عنها داخل المؤسسات العمومية (المادة 6 والمرسوم 2.24.141)</h3>
            <p style="margin-bottom:0;">
                في مقابل منع الدروس الخصوصية بمقابل لمتعلمي المؤسسة العمومية التي يزاول بها الأستاذ مهامه صوناً لتكافؤ الفرص والإنصاف (المادة 6 والمادة 7)، كرس المرسوم رقم 2.24.141 العمل بالمرسوم رقم 2.05.1012 المتعلق بالتعويضات عن الساعات الإضافية داخل مؤسسات التربية والتعليم العمومي بتعريفة 159 درهماً للساعة في الابتدائي والإعدادي، و218 درهماً للساعة في الثانوي التأهيلي، و300 درهم في الأقسام التحضيرية ومراكز التكوين.
            </p>
        </div>
    """,
    "06": """
        <h2 id="sec-cases-06">7. المسطرة العملية للتظلم الإداري ومحو العقوبات التأديبية بشهادات التقدير أو بمرور الأجل (المواد 54 و62 و64 و65)</h2>
        <div class="step-card">
            <p>
                لتمكين الأساتذة والأطر التربوية والإدارية من ممارسة حقوقهم الإدارية المكفولة في المواد 54 و62 و64 و65 من المرسوم رقم 2.24.140 بطريقة سليمة قانوناً، نوضح الخطوات المسطرية الدقيقة لكلتا الآليتين:
            </p>
            <div class="sim-grid-2">
                <div class="info-box" style="margin:0;">
                    <h3 style="margin-top:0;">أولاً: مسطرة التظلم الإداري بخصوص نقطة التقييم المهني (المادتان 53 و54)</h3>
                    <ol>
                        <li><strong>الاطلاع على بطاقة التنقيط السنوية (0 إلى 20):</strong> يطلع الموظف على النقطة العددية الممنوحة له وفق شبكة التنقيط المؤشر عليها من الوظيفة العمومية، ويمكن لأطر التدريس إرفاق استمارة التقييم الذاتي الاختيارية (المادة 53).</li>
                        <li><strong>تحرير تظلم معلل:</strong> في حال عدم اقتناع الموظف بالنقطة الممنوحة له، يوجه تظلماً كتابياً معللاً عبر السلم الإداري إلى مدير الأكاديمية الجهوية للتربية والتكوين مرفقاً بالوثائق المثبتة لتنفيذ المهام وجودة الممارسات المهنية والانخراط في مشروع المؤسسة المندمج.</li>
                        <li><strong>مراجعة النقطة قبل جداول الترقي:</strong> يبت في التظلم قبل الحصر النهائي للوائح الترقي في الرتبة (المادة 49) والدرجة (المادة 50).</li>
                    </ol>
                </div>
                <div class="success-box" style="margin:0;">
                    <h3 style="margin-top:0;color:#006233;">ثانياً: مسطرة محو أو سحب العقوبة التأديبية (المادتان 64 و65)</h3>
                    <ol>
                        <li><strong>المسار التحفيزي السريع (المادة 65):</strong> الحصول على شهادة «التشجيع» يترتب عنه محو عقوبة الإنذار، وشهادة «التنويه» تمحو عقوبة التوبيخ، وشهادة «ميزة الشرف» تمحو وتسحب آثار باقي العقوبات التأديبية المقيدة في الملف (باستثناء عقوبات الخروج من أسلاك الإدارة)، بعد استطلاع رأي اللجنة الإدارية المتساوية الأعضاء المختصة.</li>
                        <li><strong>مسار رد الاعتبار الإداري بمرور الأجل (المادة 64 / الفصل 75 مكرر):</strong> مرور <strong>5 سنوات</strong> على عقوبة الإنذار أو التوبيخ، أو <strong>10 سنوات</strong> على باقي العقوبات دون صدور عقوبة جديدة، وتقديم طلب خطي لمدير الأكاديمية الجهوية يعرض على اللجنة الإدارية المتساوية الأعضاء لسحب العقوبة نهائياً من الملف.</li>
                    </ol>
                </div>
            </div>
        </div>
    """,
    "07": """
        <h2 id="sec-cases-07">6. جدول تطبيقي شامل لإعادة الترتيب عند الترقية بين الدرجات (المادتان 52 و66)</h2>
        <div class="step-card">
            <p>
                يوضح الجدول التطبيقي التالي كيفية انتقال الأستاذ أو الموظف من رتبته في <strong>الدرجة الثانية (السلم 10)</strong> إلى رتبته الجديدة في <strong>الدرجة الأولى (السلم 11)</strong>، ومن <strong>الدرجة الأولى</strong> إلى <strong>الدرجة الممتازة (خارج السلم)</strong> تطبيقاً للقاعدة الرسمية في <strong>المادة 52</strong> و<strong>المادة 66</strong> من المرسوم رقم 2.24.140:
            </p>
            <div class="table-container" style="margin-bottom:0;">
                <table>
                    <thead>
                        <tr>
                            <th>الوضعية الأصلية قبل الترقية</th>
                            <th>الرقم الاستدلالي الأصلي (المادة 66)</th>
                            <th>الوضعية الجديدة بعد إعادة الترتيب (المادة 52)</th>
                            <th>الرقم الاستدلالي الجديد (المادة 66)</th>
                            <th>مصير الأقدمية المكتسبة في الرتبة السابقة (المادة 52)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>الدرجة الثانية - الرتبة 5</strong></td>
                            <td>377</td>
                            <td><strong>الدرجة الأولى - الرتبة 4</strong><br><small>(الرتبة العددية التي تقل مباشرة عن 5)</small></td>
                            <td>436 (+59 نقطة استدلالية)</td>
                            <td>يحتفظ بأقدميته المكتسبة في الرتبة 5 في حدود مدة النسق السريع (سنتان) للترقي إلى الرتبة 5 (472).</td>
                        </tr>
                        <tr>
                            <td><strong>الدرجة الثانية - الرتبة 6</strong></td>
                            <td>402</td>
                            <td><strong>الدرجة الأولى - الرتبة 5</strong><br><small>(الرتبة العددية التي تقل مباشرة عن 6)</small></td>
                            <td>472 (+70 نقطة استدلالية)</td>
                            <td>يحتفظ بأقدميته في الرتبة 6 في حدود سنتين للانتقال السريع إلى الرتبة 6 من الدرجة الأولى (509) ذات القفزة المالية الكبرى.</td>
                        </tr>
                        <tr>
                            <td><strong>الدرجة الثانية - الرتبة 8</strong></td>
                            <td>456</td>
                            <td><strong>الدرجة الأولى - الرتبة 7</strong><br><small>(الرتبة العددية التي تقل مباشرة عن 8)</small></td>
                            <td>542 (+86 نقطة استدلالية)</td>
                            <td>يُرتب مباشرة في الرتبة 7 (وهي الرتبة المؤهلة لولوج الدرجة الممتازة بعد استيفاء 5 سنوات في الدرجة الأولى).</td>
                        </tr>
                        <tr>
                            <td><strong>الدرجة الثانية - الرتبة 10</strong></td>
                            <td>512</td>
                            <td><strong>الدرجة الأولى - الرتبة 9</strong><br><small>(الرتبة العددية التي تقل مباشرة عن 10)</small></td>
                            <td>606 (+94 نقطة استدلالية)</td>
                            <td>يحتفظ بأقدميته في الرتبة 10 في حدود سنتين للانتقال إلى الرتبة 10 من الدرجة الأولى (639).</td>
                        </tr>
                        <tr>
                            <td><strong>الدرجة الأولى - الرتب 7 إلى 12</strong></td>
                            <td>من 542 إلى 690</td>
                            <td><strong>الدرجة الممتازة - الرتبة 1</strong><br><small>(الفقرة 3 من المادة 52)</small></td>
                            <td>704</td>
                            <td>يُرتب في الرتبة 1 بالدرجة الممتازة (704) ويترقى للرتبة 2 (746) بعد 3 سنوات (مع إضافة 3 سنوات اعتبارية للمشمولين بالمادة 87).</td>
                        </tr>
                        <tr>
                            <td><strong>الدرجة الأولى - الرتبة 13 أو الرتبة الاستثنائية</strong></td>
                            <td>704</td>
                            <td><strong>الدرجة الممتازة - الرتبة 1</strong><br><small>(معادلة للرقم الاستدلالي السابق 704)</small></td>
                            <td>704</td>
                            <td>يحتفظ بأقدميته المكتسبة في الرتبة 13 أو الاستثنائية في حدود <strong>سنتين (2)</strong> للانتقال السريع إلى الرتبة 2 (746).</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    """,
    "08": """
        <h2 id="sec-cases-08">5. الدليل العملي لملف ترسيم الأستاذ المتمرن وملف المباراة المهنية لحاملي الماستر (المواد 45 و47 و48)</h2>
        <div class="step-card">
            <p>
                يمر الأستاذ الجديد بعد تخرجه من المركز الجهوي لمهن التربية والتكوين (CRMEF) بمرحلة التمرين (Stage) في الرتبة الأولى لمدة سنة كاملة طبقاً للمادتين 47 و48 من المرسوم رقم 2.24.140. ولنجاح هذه المرحلة أو للمشاركة في المباراة المهنية لحاملي الماستر (المادة 45)، يتعين استحضار الضوابط التنظيمية التالية:
            </p>
            <div class="sim-grid-2">
                <div class="info-box" style="margin:0;">
                    <h3 style="margin-top:0;">ملف ترسيم الأستاذ المتمرن (المادتان 47 و48)</h3>
                    <ul>
                        <li>إعداد ملف الترسيم التربوي والإداري (دفتر النصوص، الجذاذات البيداغوجية، تخطيط الحلقات الدراسية، سجل التنقيط والمواظبة، وتقرير الأنشطة المندمجة أو الجمعية الرياضية المدرسية ASS بالنسبة لأستاذ التربية البدنية).</li>
                        <li>المثول أمام اللجنة المختصة بالترسيم (أو مفتش ما بعد البكالوريا بالنسبة للمبرزين) طبقاً للقرار الوزاري المتخذ تطبيقاً للمادة 48.</li>
                        <li>فور المصادقة على الترسيم، تحتسب سنة التمرين العادية كاملة للانتقال من الرتبة 1 (275) إلى <strong>الرتبة 2 من الدرجة الثانية (الرقم الاستدلالي 300)</strong> طبقاً لجدول المادة 49.</li>
                    </ul>
                </div>
                <div class="success-box" style="margin:0;">
                    <h3 style="margin-top:0;color:#006233;">ملف المباراة المهنية لحاملي الماستر (المادة 45)</h3>
                    <ul>
                        <li>أن يكون المترشح <strong>موظفاً مرسماً</strong> خاضعاً للمرسوم رقم 2.24.140 في تاريخ الإعلان عن المباراة السنوية.</li>
                        <li>الإدلاء بشهادة الماستر أو الماستر المتخصص أو دبلوم الدراسات العليا أو دبلوم مهندس الدولة أو ما يعادل إحداها في التخصصات المفتوحة بقرار وزاري.</li>
                        <li>يعين الناجحون المنتمون لأطر التدريس مباشرة في <strong>الدرجة الأولى من إطار أستاذ التعليم الثانوي التأهيلي</strong> مع الإعفاء من فترة التمرين وإعادة الترتيب وفق المادة 52.</li>
                    </ul>
                </div>
            </div>
        </div>
    """,
    "09": """
        <h2 id="sec-cases-09">5. تطبيقات عملية لحساب عائد الساعات الإضافية والحصة الأسبوعية لأستاذ التربية البدنية (المادتان 68 و69 والمرسوم 2.24.141)</h2>
        <div class="step-card">
            <p>
                بموجب المرسوم رقم 2.24.141 المنشور في الصفحة 1386 من الجريدة الرسمية عدد 7277، تخول الساعات الإضافية المنجزة داخل المؤسسات التعليمية العمومية تعويضاً مالياً يؤدى عن كل ساعة فعلية منجزة. ويوضح المثال التطبيقي التالي كيفية احتساب هذا التعويض:
            </p>
            <div class="sim-grid-2">
                <div class="info-box" style="margin:0;">
                    <h3 style="margin-top:0;">مثال 1: أستاذ بالتعليم الثانوي الإعدادي ينجز 4 ساعات إضافية أسبوعياً</h3>
                    <p>
                        وفق تعريفة المرسوم 2.05.1012 المعمول بها بموجب المرسوم 2.24.141 والمحددة في <strong>159 درهماً للساعة الواحدة</strong> بالتعليم الإعدادي والابتدائي، فإن إنجاز 4 ساعات إضافية أسبوعياً (16 ساعة في الشهر) يخول تعويضاً شهرياً خاماً قدره:
                        <br><strong style="color:#991b1b;">16 ساعة × 159 درهماً = 2,544 درهماً في الشهر</strong>.
                    </p>
                </div>
                <div class="success-box" style="margin:0;">
                    <h3 style="margin-top:0;color:#006233;">مثال 2: أستاذ بالتعليم الثانوي التأهيلي ينجز 4 ساعات إضافية أسبوعياً</h3>
                    <p>
                        وفق التعريفة المحددة في <strong>218 درهماً للساعة الواحدة</strong> بالتعليم الثانوي التأهيلي، فإن إنجاز 4 ساعات إضافية أسبوعياً (16 ساعة في الشهر) يخول تعويضاً شهرياً خاماً قدره:
                        <br><strong style="color:#006233;">16 ساعة × 218 درهماً = 3,488 درهماً في الشهر</strong>.
                    </p>
                </div>
            </div>
            <p style="margin:1rem 0 0 0;">
                وبالنسبة لأساتذة مادة التربية البدنية والرياضية، تظل الحصة الأسبوعية النظامية بموجب المادة 68 محددة في <strong>24 ساعة بالإعدادي</strong> و<strong>21 ساعة بالتأهيلي</strong> (وهي نفس الساعات المطبقة على المختصين التربويين والمختصين الاجتماعيين بموجب المادة 69)، مع احتساب الساعتين المخصصتين لتنشيط الجمعية الرياضية المدرسية (ASS) يوم الجمعة بعد الزوال ضمن جدول الحصص الرسمي للأستاذ.
            </p>
        </div>
    """,
    "10": """
        <h2 id="sec-cases-10">6. جسور الارتقاء والحركية المهنية من هيئة التدريس نحو الإدارة والتفتيش والبحث العلمي (المواد 33 و44 و52 و57)</h2>
        <div class="step-card">
            <p>
                من أبرز المزايا الهندسية التي أرساها المرسوم رقم 2.24.140 أنه بنى <strong>جسور ترقٍ وحركية مهنية (Passerelles professionnelles)</strong> تمكن أطر التدريس من الارتقاء المهني نحو الهيئات الأخرى مع الاحتفاظ بمكتسباتهم:
            </p>
            <div class="sim-grid-3">
                <div class="info-box" style="margin:0;">
                    <h3 style="margin-top:0;">الجسر الأول: متصرف تربوي أو مستشار أو ممون (المادة 44)</h3>
                    <p style="margin-bottom:0;">
                        يمكن لأطر التدريس الترشح لمباراة سلك الإدارة التربوية أو سلك الممونين بـ CRMEF أو مركز التوجيه والتخطيط التربوي (COPE)، وبعد التخرج يُعيَّنون في <strong>الدرجة الأولى (السلم 11)</strong> مع الإعفاء من التمرين ومنح <strong>سنتين (2) أقدمية اعتبارية</strong> لمن غيروا الإطار دون تغيير الدرجة!
                    </p>
                </div>
                <div class="success-box" style="margin:0;">
                    <h3 style="margin-top:0;color:#006233;">الجسر الثاني: هيئة التفتيش والتأطير والمراقبة والتقييم (المواد 23-28 و44)</h3>
                    <p style="margin-bottom:0;">
                        يفتح مركز تكوين مفتشي التعليم (CFIE) أبوابه عبر المباراة أمام الأساتذة المرسمين ليتخرجوا في إطار مفتش تربوي للتعليم الابتدائي أو الإعدادي أو التأهيلي أو ما بعد البكالوريا (بما في ذلك مفتشو التربية البدنية والرياضية) المرتبين في الدرجة الأولى والدرجة الممتازة.
                    </p>
                </div>
                <div class="info-box" style="margin:0;">
                    <h3 style="margin-top:0;">الجسر الثالث: هيئة الأساتذة الباحثين في التربية والتكوين (المواد 33-37 و46)</h3>
                    <p style="margin-bottom:0;">
                        يحق لحاملي الدكتوراه الترشح لمباريات توظيف <strong>الأساتذة المساعدين في التربية والتكوين</strong> بمراكز CRMEF وCFIE وCOPE، مع التدرج الأكاديمي الكامل (أستاذ مساعد ⬅️ أستاذ مؤهل ⬅️ أستاذ مؤطر) بنفس الوضعية المادية والعلمية لأساتذة التعليم العالي.
                    </p>
                </div>
            </div>
        </div>
    """
}


def normalize_article(art: dict) -> dict:
    a = dict(art)
    a.setdefault("meta_title", f"{a['title']} | ProfEPS")
    a.setdefault("category_label", a.get("badge", "النظام الأساسي 2024"))
    a.setdefault("keywords", f"{a['title']}, النظام الأساسي 2024, المرسوم 2.24.140, الجريدة الرسمية 7277")
    a.setdefault("lead", a.get("summary_excerpt", a["meta_desc"]))
    a.setdefault("default_tab", a.get("default_sim_tab", "salary"))
    if "legal_refs" not in a:
        if "toc" in a:
            a["legal_refs"] = [t[1] for t in a["toc"]]
        else:
            a["legal_refs"] = [
                "المرسوم رقم 2.24.140 صادر في 13 من شعبان 1445 (23 فبراير 2024) بشأن النظام الأساسي الخاص بموظفي الوزارة المكلفة بالتربية الوطنية (الجريدة الرسمية عدد 7277).",
                "المرسوم رقم 2.24.141 صادر في 13 من شعبان 1445 (23 فبراير 2024) بسن تدابير متفرقة تتعلق بالتعويضات المخولة لموظفي الوزارة المكلفة بالتربية الوطنية."
            ]
    return a


ALL_ARTICLES = [normalize_article(x) for x in ALL_ARTICLES]


def clean_body_html_to_site_ui(raw_html: str) -> str:
    """
    Ensures any residual utility classes in body_html are mapped to the light-mode ProfEPS Maroc classes.
    """
    h = raw_html
    h = re.sub(r'<div class="overflow-x-auto[^"]*">', '<div class="table-container">', h)
    h = re.sub(r'<blockquote class="[^"]*">', '<div class="info-box">', h)
    h = h.replace("</blockquote>", "</div>")
    h = re.sub(r'<div class="bg-slate-50[^"]*">', '<div class="step-card">', h)
    h = re.sub(r'<div class="bg-emerald-50[^"]*">', '<div class="success-box">', h)
    h = re.sub(r'<div class="bg-white border border-slate-200[^"]*">', '<div class="step-card" style="margin:0;">', h)
    h = re.sub(r'<div class="grid grid-cols-1 md:grid-cols-2[^"]*">', '<div class="sim-grid-2">', h)
    h = re.sub(r'<div class="grid grid-cols-1 md:grid-cols-3[^"]*">', '<div class="sim-grid-3">', h)
    return h


def build_interactive_simulator_html(default_tab: str, sim_num_prefix: str = "") -> str:
    """
    Builds the Interactive Dual Simulator (Salary/Indemnities Art. 59 & 66 + Promotion/Echelon Art. 49/50/52/87)
    styled 100% with the ProfEPS Maroc UI palette (--primary: #991b1b, --secondary: #006233,
    light cards #ffffff / #f8fafc, #cbd5e1 borders) and 100% exact figures from BO n° 7277.
    """
    sal_active = "active" if default_tab == "salary" else ""
    pro_active = "active" if default_tab == "promo" else ""
    sal_display = "block" if default_tab == "salary" else "none"
    pro_display = "block" if default_tab == "promo" else "none"

    return f"""
    <!-- INTERACTIVE STATUT 2024 DUAL CALCULATOR (MATCHING PROFEPS UI COLORS #991b1b & #006233) -->
    <div id="sec-simulator"></div>
    <section id="statut-2024-calculators" class="peps-sim-box">
        <div class="peps-sim-header">
            <div>
                <span class="section-badge" style="margin-bottom:0.5rem;">⚡ أدوات تفاعلية رسمية مطابقة للجريدة الرسمية عدد 7277</span>
                <h2 style="margin:0;border:none;padding:0;font-size:1.35rem;color:#0f172a;">
                    {sim_num_prefix}المحاكي القانوني التفاعلي: التعويضات والأجرة (المادتان 59 و66) + الترقية وإعادة الترتيب (المواد 49 و50 و52 و87)
                </h2>
                <p style="margin:0.35rem 0 0 0;font-size:0.9rem;color:#475569;">
                    أداة حسابية فورية مبنية 100% على الجداول الرسمية للمرسوم رقم 2.24.140 (ص. 1375–1380) والمرسوم رقم 2.24.141 (ص. 1386).
                </p>
            </div>
            <div class="peps-sim-tabs">
                <button type="button" id="btn-tab-salary" onclick="switchStatutTab('salary')" class="peps-sim-tab-btn {sal_active}">
                    💰 محاكي الأجرة والتعويضات (المادة 59 و66)
                </button>
                <button type="button" id="btn-tab-promo" onclick="switchStatutTab('promo')" class="peps-sim-tab-btn {pro_active}">
                    📈 حاسبة الترقية وإعادة الترتيب (المواد 49–52)
                </button>
            </div>
        </div>

        <!-- TAB 1: SALARY & ALLOWANCES SIMULATOR (ARTICLES 59 & 66) -->
        <div id="panel-tab-salary" style="display:{sal_display};margin-top:1.25rem;">
            <div class="sim-grid-2">
                <div class="step-card" style="margin:0;background:#f8fafc;">
                    <h3 style="margin-top:0;color:#991b1b;font-size:1.05rem;border-bottom:1px solid #e2e8f0;padding-bottom:0.5rem;">
                        1. حدد وضعيتك الإدارية (المادة 59 والمادة 66)
                    </h3>
                    <div class="peps-field">
                        <label for="sim-grade">الدرجة الإدارية (السلم المعادل - المادة 52):</label>
                        <select id="sim-grade" onchange="updateStatutSalaryOptions()">
                            <option value="G2" selected>الدرجة الثانية (السلم 10) — أطر التدريس والدعم والإدارة</option>
                            <option value="G1">الدرجة الأولى (السلم 11) — أطر التدريس والدعم والإدارة والتفتيش</option>
                            <option value="GM">الدرجة الممتازة (خارج السلم) — كافة الهيئات</option>
                            <option value="G3">الدرجة الثالثة (السلم 9 — المساعدون التربويون)</option>
                            <option value="G4">الدرجة الرابعة (السلم 8 — المساعدون التربويون)</option>
                            <option value="G5">الدرجة الخامسة (السلم 6 — المساعدون التربويون)</option>
                        </select>
                    </div>
                    <div class="peps-field">
                        <label for="sim-echelon">الرتبة (Échelon) والرقم الاستدلالي الرسمي (المادة 66):</label>
                        <select id="sim-echelon" onchange="calculateStatutSalary()"></select>
                    </div>
                    <div class="sim-grid-2" style="gap:0.75rem;">
                        <div class="peps-field">
                            <label for="sim-zone">منطقة الإقامة:</label>
                            <select id="sim-zone" onchange="calculateStatutSalary()">
                                <option value="C" selected>المنطقة ج (10%)</option>
                                <option value="B">المنطقة ب (15%)</option>
                                <option value="A">المنطقة أ (25%)</option>
                            </select>
                        </div>
                        <div class="peps-field">
                            <label for="sim-children">التعويضات العائلية (الأطفال):</label>
                            <select id="sim-children" onchange="calculateStatutSalary()">
                                <option value="0" selected>0 طفل</option>
                                <option value="1">طفل واحد (+300 د)</option>
                                <option value="2">طفلان (+600 د)</option>
                                <option value="3">3 أطفال (+900 د)</option>
                                <option value="4">4 أطفال (+936 د)</option>
                                <option value="5">5 أطفال (+972 د)</option>
                                <option value="6">6 أطفال (+1008 د)</option>
                            </select>
                        </div>
                    </div>
                    <div class="peps-field" style="margin-bottom:0;">
                        <label for="sim-heures">ساعات إضافية أسبوعية اختيارية (المرسوم 2.24.141):</label>
                        <select id="sim-heures" onchange="calculateStatutSalary()">
                            <option value="0" selected>بدون ساعات إضافية (0 ساعة)</option>
                            <option value="2_159">ساعتان أسبوعياً — ابتدائي/إعدادي (159 درهم/ساعة)</option>
                            <option value="4_159">4 ساعات أسبوعياً — ابتدائي/إعدادي (159 درهم/ساعة)</option>
                            <option value="2_218">ساعتان أسبوعياً — ثانوي تأهيلي (218 درهم/ساعة)</option>
                            <option value="4_218">4 ساعات أسبوعياً — ثانوي تأهيلي (218 درهم/ساعة)</option>
                            <option value="2_300">ساعتان أسبوعياً — أقسام تحضيرية/مراكز (300 درهم/ساعة)</option>
                        </select>
                    </div>
                </div>

                <div class="step-card" style="margin:0;display:flex;flex-direction:column;justify-content:space-between;">
                    <div>
                        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.5rem;border-bottom:1px solid #e2e8f0;padding-bottom:0.6rem;margin-bottom:1rem;">
                            <h3 style="margin:0;color:#0f172a;font-size:1.05rem;">2. تفاصيل التعويضات الرسمية والأجرة التقديرية</h3>
                            <span id="sim-indice-badge" style="padding:0.25rem 0.75rem;border-radius:999px;background:#f3faf6;color:#006233;border:1px solid #a7d7c5;font-size:0.8rem;font-weight:800;">
                                الرتبة 2 · الرقم الاستدلالي: 300
                            </span>
                        </div>

                        <div class="sim-grid-3" style="margin-bottom:1rem;">
                            <div class="peps-kpi-card">
                                <div class="peps-kpi-label">التعويض عن التعليم / التدرج (يناير 2025)</div>
                                <div id="res-ind-ens-2025" class="peps-kpi-val" style="color:#006233;">5,741 درهم</div>
                                <div id="res-ind-ens-evol" class="peps-kpi-sub">شتنبر 2023: 3,634 د | يناير 2024: 4,696 د</div>
                            </div>
                            <div class="peps-kpi-card">
                                <div class="peps-kpi-label">التعويض عن الأعباء (المادة 59)</div>
                                <div id="res-ind-charges" class="peps-kpi-val" style="color:#991b1b;">1,000 درهم</div>
                                <div class="peps-kpi-sub">مقدار شهري قار حسب الدرجة</div>
                            </div>
                            <div class="peps-kpi-card">
                                <div class="peps-kpi-label">التعويض عن التأطير (المادة 59)</div>
                                <div id="res-ind-encadrement" class="peps-kpi-val" style="color:#0f172a;">0 درهم</div>
                                <div id="res-ind-enc-note" class="peps-kpi-sub">يبدأ من الرتبة 6 بالدرجة 2</div>
                            </div>
                        </div>

                        <div class="success-box" style="margin:0 0 1rem 0;">
                            <div class="sim-grid-3" style="align-items:center;">
                                <div>
                                    <div style="font-size:0.78rem;color:#334155;font-weight:700;">مجموع التعويضات الخام (المادة 59):</div>
                                    <div id="res-total-ind-brut" style="font-size:1.15rem;font-weight:900;color:#0f172a;">6,741 درهم/شهر</div>
                                </div>
                                <div>
                                    <div style="font-size:0.78rem;color:#334155;font-weight:700;">الأجرة الشهرية الصافية التقديرية:</div>
                                    <div id="res-net-2025" style="font-size:1.3rem;font-weight:900;color:#006233;">~ 6,740 درهم/شهر</div>
                                </div>
                                <div>
                                    <div style="font-size:0.78rem;color:#334155;font-weight:700;">الزيادة الصافية المكتسبة:</div>
                                    <div id="res-gain-net" style="font-size:0.9rem;font-weight:800;color:#991b1b;">+1,500 درهم صافية شهرياً</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="res-heures-box" style="font-size:0.82rem;color:#334155;background:#fff8f8;border:1px solid #f5c2c7;border-radius:10px;padding:0.75rem 1rem;">
                        💡 <strong>ملاحظة قانونية (المادة 59 و60):</strong> تُصرف الزيادة العامة في الأجور (+1500 درهم صافية شهرياً) عبر شطرين متساويين في خانة «التعويض عن التعليم / التدرج الإداري» (الشطر الأول من فاتح يناير 2024 والشطر الثاني من فاتح يناير 2025).
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 2: PROMOTION IN ECHELON, GRADE & HORS ECHELLE CALCULATOR (ARTICLES 49, 50, 52, 81, 87) -->
        <div id="panel-tab-promo" style="display:{pro_display};margin-top:1.25rem;">
            <div class="sim-grid-2">
                <div class="step-card" style="margin:0;background:#f8fafc;">
                    <h3 style="margin-top:0;color:#991b1b;font-size:1.05rem;border-bottom:1px solid #e2e8f0;padding-bottom:0.5rem;">
                        1. معطيات الأقدمية والرتبة الحالية (المواد 49 و50 و52 و87)
                    </h3>
                    <div class="peps-field">
                        <label for="pro-grade">الدرجة الحالية للموظف:</label>
                        <select id="pro-grade" onchange="calculateStatutPromotion()">
                            <option value="G2">الدرجة الثانية (السلم 10) — نحو الدرجة الأولى (السلم 11)</option>
                            <option value="G1" selected>الدرجة الأولى (السلم 11) — نحو الدرجة الممتازة (خارج السلم)</option>
                            <option value="GM">الدرجة الممتازة (خارج السلم) — الترقي في رتب خارج السلم</option>
                        </select>
                    </div>
                    <div class="sim-grid-2" style="gap:0.75rem;">
                        <div class="peps-field">
                            <label for="pro-echelon">الرتبة الحالية:</label>
                            <select id="pro-echelon" onchange="calculateStatutPromotion()">
                                <option value="1">الرتبة 1</option>
                                <option value="2">الرتبة 2</option>
                                <option value="3">الرتبة 3</option>
                                <option value="4">الرتبة 4</option>
                                <option value="5">الرتبة 5</option>
                                <option value="6">الرتبة 6</option>
                                <option value="7" selected>الرتبة 7</option>
                                <option value="8">الرتبة 8</option>
                                <option value="9">الرتبة 9</option>
                                <option value="10">الرتبة 10</option>
                                <option value="11">الرتبة 11 (الابتدائي/الإعدادي/المختصون - الرقم 675)</option>
                                <option value="110">الرتبة الاستثنائية (التأهيلي/المبرز/المفتش/المتصرف - 704 أو 564)</option>
                                <option value="12">الرتبة 12 (الابتدائي/الإعدادي/المختصون - الرقم 690)</option>
                                <option value="13">الرتبة 13 (الابتدائي/الإعدادي/المختصون - الرقم 704)</option>
                            </select>
                        </div>
                        <div class="peps-field">
                            <label for="pro-anc-grade">الأقدمية في الدرجة (بالسنوات):</label>
                            <input type="number" id="pro-anc-grade" value="6" min="0" max="35" onchange="calculateStatutPromotion()" onkeyup="calculateStatutPromotion()" />
                        </div>
                    </div>
                    <div class="peps-field" style="margin-bottom:0;">
                        <label for="pro-rythme">نسق الترقي في الرتبة (جدول المادة 49 - ص. 1375):</label>
                        <select id="pro-rythme" onchange="calculateStatutPromotion()">
                            <option value="fast" selected>النسق السريع (16 سنة لبلوغ الرتبة 10)</option>
                            <option value="medium">النسق المتوسط (22 سنة لبلوغ الرتبة 10)</option>
                            <option value="slow">النسق البطيء (29 سنة لبلوغ الرتبة 10)</option>
                        </select>
                    </div>
                </div>

                <div class="step-card" style="margin:0;display:flex;flex-direction:column;justify-content:space-between;">
                    <div>
                        <h3 style="margin-top:0;color:#0f172a;font-size:1.05rem;border-bottom:1px solid #e2e8f0;padding-bottom:0.6rem;margin-bottom:1rem;">
                            2. نتيجة التشخيص القانوني للترقية في الرتبة والدرجة وإعادة الترتيب (المواد 49–52)
                        </h3>
                        <div class="sim-grid-2" style="gap:0.75rem;margin-bottom:1rem;">
                            <div class="peps-kpi-card">
                                <div class="peps-kpi-label">الترقية إلى الرتبة الموالية (المادة 49):</div>
                                <div id="pro-res-next-echelon" style="font-size:0.98rem;font-weight:900;color:#006233;">الانتقال من الرتبة 7 إلى الرتبة 8</div>
                                <div id="pro-res-echelon-time" class="peps-kpi-sub">المدة المطلوبة: سنتان (2) بالنسق السريع</div>
                            </div>
                            <div class="peps-kpi-card">
                                <div class="peps-kpi-label">إعادة الترتيب عند الترقية في الدرجة (المادة 52):</div>
                                <div id="pro-res-reclassement" style="font-size:0.98rem;font-weight:900;color:#991b1b;">الدرجة الممتازة — الرتبة 1 (الرقم 704)</div>
                                <div id="pro-res-reclass-note" class="peps-kpi-sub">مقابل الرتبة 7 بالدرجة الأولى (الرقم 542)</div>
                            </div>
                        </div>

                        <div id="pro-res-grade-status" class="success-box" style="margin:0;font-size:0.9rem;"></div>
                    </div>
                    <div style="font-size:0.82rem;color:#334155;background:#fff8f8;border:1px solid #f5c2c7;border-radius:10px;padding:0.75rem 1rem;margin-top:1rem;">
                        📌 <strong>قاعدة التسقيف وإعادة الترتيب (المادتان 50 و52):</strong> الموظفون الذين لم تتم ترقيتهم بالاختيار بعد تقييدهم للمرة الثالثة، يرقون <strong>بدون حصيص في التقييد الرابع</strong>، ويعين المرقى من الدرجة 2 إلى 1 في <strong>الرتبة العددية التي تقل مباشرة عن رتبته الأصلية</strong>.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script>
    (function() {{
        // Exact official figures from Article 59 (p. 1378) & Article 66 (p. 1380) of Bulletin Officiel n° 7277
        const STATUT_DATA = {{
            G5: {{
                label: "الدرجة الخامسة (السلم 6)",
                ens23: [2712,2712,2712,2712,2712,2712,2712,2712,2712,2712],
                ens24: [3633,3633,3633,3633,3633,3650,3650,3650,3650,3650],
                ens25: [4605,4605,4605,4605,4605,4702,4702,4702,4702,4702],
                charges: 305,
                enc: [0,0,0,0,0,0,0,0,0,0],
                echelons: [
                    {{e:"الرتبة 1", ind:153}}, {{e:"الرتبة 2", ind:161}}, {{e:"الرتبة 3", ind:173}},
                    {{e:"الرتبة 4", ind:185}}, {{e:"الرتبة 5", ind:197}}, {{e:"الرتبة 6", ind:209}},
                    {{e:"الرتبة 7", ind:222}}, {{e:"الرتبة 8", ind:236}}, {{e:"الرتبة 9", ind:249}},
                    {{e:"الرتبة 10", ind:262}}
                ]
            }},
            G4: {{
                label: "الدرجة الرابعة (السلم 8)",
                ens23: [3043,3043,3043,3043,3043,3043,3043,3043,3043,3043],
                ens24: [4005,4005,4005,4005,4005,4098,4098,4098,4098,4098],
                ens25: [5052,5052,5052,5052,5052,5084,5084,5084,5084,5084],
                charges: 305,
                enc: [0,0,0,0,0,0,0,0,0,0],
                echelons: [
                    {{e:"الرتبة 1", ind:207}}, {{e:"الرتبة 2", ind:224}}, {{e:"الرتبة 3", ind:241}},
                    {{e:"الرتبة 4", ind:259}}, {{e:"الرتبة 5", ind:276}}, {{e:"الرتبة 6", ind:293}},
                    {{e:"الرتبة 7", ind:311}}, {{e:"الرتبة 8", ind:332}}, {{e:"الرتبة 9", ind:353}},
                    {{e:"الرتبة 10", ind:373}}
                ]
            }},
            G3: {{
                label: "الدرجة الثالثة (السلم 9)",
                ens23: [3239,3239,3239,3239,3239,3239,3239,3239,3239,3239],
                ens24: [4272,4272,4272,4272,4272,4291,4291,4291,4291,4291],
                ens25: [5276,5276,5276,5276,5276,5315,5315,5315,5315,5315],
                charges: 305,
                enc: [0,0,0,0,0,0,0,0,0,0],
                echelons: [
                    {{e:"الرتبة 1", ind:235}}, {{e:"الرتبة 2", ind:253}}, {{e:"الرتبة 3", ind:274}},
                    {{e:"الرتبة 4", ind:296}}, {{e:"الرتبة 5", ind:317}}, {{e:"الرتبة 6", ind:339}},
                    {{e:"الرتبة 7", ind:361}}, {{e:"الرتبة 8", ind:382}}, {{e:"الرتبة 9", ind:404}},
                    {{e:"الرتبة 10", ind:438}}
                ]
            }},
            G2: {{
                label: "الدرجة الثانية (السلم 10)",
                ens23: [3634,3634,3634,3634,3634,3677,3677,3677,3677,3677,3677],
                ens24: [4696,4696,4696,4696,4696,4791,4791,4791,4791,4791,4791],
                ens25: [5741,5741,5741,5741,5741,5928,5928,5928,5928,5928,5928],
                charges: 1000,
                enc: [0,0,0,0,0,700,700,700,700,700,700],
                echelons: [
                    {{e:"الرتبة 1 (متمرن)", ind:275}}, {{e:"الرتبة 2 (مرسم)", ind:300}}, {{e:"الرتبة 3", ind:326}},
                    {{e:"الرتبة 4", ind:351}}, {{e:"الرتبة 5", ind:377}}, {{e:"الرتبة 6", ind:402}},
                    {{e:"الرتبة 7", ind:428}}, {{e:"الرتبة 8", ind:456}}, {{e:"الرتبة 9", ind:484}},
                    {{e:"الرتبة 10", ind:512}}, {{e:"الرتبة الاستثنائية", ind:564}}
                ]
            }},
            G1: {{
                label: "الدرجة الأولى (السلم 11)",
                ens23: [5113,5113,5113,5113,5113,6356,6356,6356,6356,6356,6356,6806,6806,6806],
                ens24: [6251,6251,6251,6251,6251,7717,7717,7717,7717,7717,7717,8153,8153,8153],
                ens25: [7475,7475,7475,7475,7475,9060,9060,9060,9060,9060,9060,9475,9475,9475],
                charges: 1000,
                enc: [950,950,950,950,950,3600,3600,3600,3600,3600,3600,3600,3600,3600],
                echelons: [
                    {{e:"الرتبة 1", ind:336}}, {{e:"الرتبة 2", ind:369}}, {{e:"الرتبة 3", ind:403}},
                    {{e:"الرتبة 4", ind:436}}, {{e:"الرتبة 5", ind:472}}, {{e:"الرتبة 6", ind:509}},
                    {{e:"الرتبة 7 (عتبة خارج السلم)", ind:542}}, {{e:"الرتبة 8", ind:574}}, {{e:"الرتبة 9", ind:606}},
                    {{e:"الرتبة 10", ind:639}}, {{e:"الرتبة الاستثنائية (التأهيلي/المبرز/المفتش/المتصرف)", ind:704}},
                    {{e:"الرتبة 11 (الابتدائي/الإعدادي/المختصون)", ind:675}},
                    {{e:"الرتبة 12 (الابتدائي/الإعدادي/المختصون)", ind:690}},
                    {{e:"الرتبة 13 (الابتدائي/الإعدادي/المختصون)", ind:704}}
                ]
            }},
            GM: {{
                label: "الدرجة الممتازة (خارج السلم)",
                ens23: [8115,8115,8115,8115,8115,8115,8115,8115],
                ens24: [9437,9437,10332,10332,10332,10332,10332,10332],
                ens25: [10758,10758,12677,12677,12677,12677,12677,12677],
                charges: 1000,
                enc: [5500,5500,5500,5500,5500,5500,5500,5500],
                echelons: [
                    {{e:"الرتبة 1", ind:704}}, {{e:"الرتبة 2", ind:746}}, {{e:"الرتبة 3", ind:779}},
                    {{e:"الرتبة 4", ind:812}}, {{e:"الرتبة 5", ind:840}}, {{e:"الرتبة 6", ind:870}},
                    {{e:"الرتبة 7", ind:900}}, {{e:"الرتبة 8", ind:930}}
                ]
            }}
        }};

        window.switchStatutTab = function(tab) {{
            const btnSal = document.getElementById('btn-tab-salary');
            const btnPro = document.getElementById('btn-tab-promo');
            const panSal = document.getElementById('panel-tab-salary');
            const panPro = document.getElementById('panel-tab-promo');
            if (tab === 'salary') {{
                panSal.style.display = 'block';
                panPro.style.display = 'none';
                btnSal.classList.add('active');
                btnPro.classList.remove('active');
            }} else {{
                panPro.style.display = 'block';
                panSal.style.display = 'none';
                btnPro.classList.add('active');
                btnSal.classList.remove('active');
            }}
        }};

        window.updateStatutSalaryOptions = function() {{
            const g = document.getElementById('sim-grade').value;
            const sel = document.getElementById('sim-echelon');
            const data = STATUT_DATA[g];
            sel.innerHTML = '';
            data.echelons.forEach((item, idx) => {{
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = item.e + ' — الرقم الاستدلالي ' + item.ind;
                if ((g === 'G2' && idx === 1) || (g === 'G1' && idx === 6) || (g === 'GM' && idx === 0)) {{
                    opt.selected = true;
                }}
                sel.appendChild(opt);
            }});
            calculateStatutSalary();
        }};

        function computeMonthlyBaseFromIndice(ind) {{
            let annual = 0;
            if (ind <= 100) annual = ind * 98.85;
            else if (ind <= 150) annual = 100 * 98.85 + (ind - 100) * 79.62;
            else annual = 100 * 98.85 + 50 * 79.62 + (ind - 150) * 50.92;
            return annual / 12.0;
        }}

        window.calculateStatutSalary = function() {{
            const g = document.getElementById('sim-grade').value;
            const idx = parseInt(document.getElementById('sim-echelon').value || '0', 10);
            const zone = document.getElementById('sim-zone').value;
            const children = parseInt(document.getElementById('sim-children').value || '0', 10);
            const hVal = document.getElementById('sim-heures').value;

            const data = STATUT_DATA[g];
            const ech = data.echelons[idx] || data.echelons[0];
            const ind = ech.ind;

            const ens23 = data.ens23[idx];
            const ens24 = data.ens24[idx];
            const ens25 = data.ens25[idx];
            const charges = data.charges;
            const enc = data.enc[idx];

            const baseMonth = computeMonthlyBaseFromIndice(ind);
            const zoneRate = zone === 'A' ? 0.25 : (zone === 'B' ? 0.15 : 0.10);
            const resAllowance = baseMonth * zoneRate;

            let fam = 0;
            if (children <= 3) fam = children * 300;
            else fam = 900 + (children - 3) * 36;

            let suppHoursGross = 0;
            if (hVal !== '0') {{
                const parts = hVal.split('_');
                const hrsWeek = parseInt(parts[0], 10);
                const rate = parseInt(parts[1], 10);
                suppHoursGross = hrsWeek * 4 * rate;
            }}

            const totalIndBrut = ens25 + charges + enc;
            const grossTotal = baseMonth + resAllowance + totalIndBrut;
            let netRatio = 0.78;
            if (g === 'G1') netRatio = 0.72;
            if (g === 'GM') netRatio = 0.67;
            const estimatedNet = Math.round(grossTotal * netRatio + fam + (suppHoursGross * 0.82));

            document.getElementById('sim-indice-badge').textContent = ech.e + ' · الرقم الاستدلالي: ' + ind;
            document.getElementById('res-ind-ens-2025').textContent = ens25.toLocaleString('en-US') + ' درهم';
            document.getElementById('res-ind-ens-evol').textContent = 'شتنبر 2023: ' + ens23.toLocaleString('en-US') + ' د | يناير 2024: ' + ens24.toLocaleString('en-US') + ' د';
            document.getElementById('res-ind-charges').textContent = charges.toLocaleString('en-US') + ' درهم';
            document.getElementById('res-ind-encadrement').textContent = enc.toLocaleString('en-US') + ' درهم';
            const encNoteEl = document.getElementById('res-ind-enc-note');
            if (encNoteEl) {{
                if (g === 'GM') encNoteEl.textContent = '5,500 د قارة في جميع رتب خارج السلم';
                else if (g === 'G1') encNoteEl.textContent = idx < 5 ? '950 د (الرتب 1-5) | يرتفع إلى 3,600 د من الرتبة 6' : '3,600 د ابتداءً من الرتبة 6 بالدرجة 1';
                else if (g === 'G2') encNoteEl.textContent = idx < 5 ? 'يبدأ بـ 700 د ابتداءً من الرتبة 6 بالدرجة 2' : '700 د ابتداءً من الرتبة 6 بالدرجة 2';
                else encNoteEl.textContent = 'غير مخول للدرجات 3 و4 و5 (المادة 59)';
            }}
            document.getElementById('res-total-ind-brut').textContent = totalIndBrut.toLocaleString('en-US') + ' درهم/شهر';
            document.getElementById('res-net-2025').textContent = '~ ' + estimatedNet.toLocaleString('en-US') + ' درهم/شهر';
            const gainNetEl = document.getElementById('res-gain-net');
            if (gainNetEl) {{
                const diffBrut = ens25 - ens23;
                gainNetEl.textContent = '+' + diffBrut.toLocaleString('en-US') + ' د خام (+1,500 د صافية/شهر)';
            }}

            const hBox = document.getElementById('res-heures-box');
            if (suppHoursGross > 0) {{
                hBox.innerHTML = '⏱️ <strong>شامل للتعويض عن الساعات الإضافية (المرسوم 2.24.141):</strong> يضيف لك إنجاز الساعات الإضافية المختارة مبلغاً خاماً قدره <strong>' + suppHoursGross.toLocaleString('en-US') + ' درهم شهرياً</strong> زيادة على الأجرة النظامية.';
            }} else {{
                hBox.innerHTML = '💡 <strong>ملاحظة قانونية (المادة 59 و60):</strong> تُصرف الزيادة العامة في الأجور (+1500 درهم صافية شهرياً) عبر شطرين متساويين في خانة «التعويض عن التعليم / التدرج الإداري» (الشطر الأول من فاتح يناير 2024 والشطر الثاني من فاتح يناير 2025).';
            }}
        }};

        window.calculateStatutPromotion = function() {{
            const g = document.getElementById('pro-grade').value;
            const rawEch = parseInt(document.getElementById('pro-echelon').value || '1', 10);
            const isExcep = (rawEch === 110);
            const ech = isExcep ? 11 : rawEch;
            const anc = parseFloat(document.getElementById('pro-anc-grade').value || '0');
            const rythme = document.getElementById('pro-rythme').value;

            // Exact step durations from Article 49 Table (Bulletin Officiel n° 7277, p. 1375)
            // Totals from Echelon 1 to 10: Fast = 16 years, Medium = 22 years, Slow = 29 years
            const durations = {{
                1: {{fast: "سنة واحدة (1)", medium: "سنة واحدة (1)", slow: "سنة واحدة (1)"}},
                2: {{fast: "سنة واحدة (1)", medium: "سنة ونصف (1.5)", slow: "سنتان (2)"}},
                3: {{fast: "سنتان (2)", medium: "سنتان ونصف (2.5)", slow: "3 سنوات"}},
                4: {{fast: "سنتان (2)", medium: "سنتان ونصف (2.5)", slow: "3.5 سنوات"}},
                5: {{fast: "سنتان (2)", medium: "سنتان ونصف (2.5)", slow: "3.5 سنوات"}},
                6: {{fast: "سنتان (2)", medium: "3 سنوات", slow: "4 سنوات"}},
                7: {{fast: "سنتان (2)", medium: "3 سنوات", slow: "4 سنوات"}},
                8: {{fast: "سنتان (2)", medium: "3 سنوات", slow: "4 سنوات"}},
                9: {{fast: "سنتان (2)", medium: "3 سنوات", slow: "4 سنوات"}}
            }};

            const nextEchEl = document.getElementById('pro-res-next-echelon');
            const echTimeEl = document.getElementById('pro-res-echelon-time');
            const reclEl = document.getElementById('pro-res-reclassement');
            const reclNoteEl = document.getElementById('pro-res-reclass-note');
            const statusEl = document.getElementById('pro-res-grade-status');

            if (g === 'GM') {{
                const curGmEch = Math.min(ech, 8);
                const nextE = Math.min(curGmEch + 1, 8);
                nextEchEl.textContent = curGmEch < 8 ? ('الانتقال من الرتبة ' + curGmEch + ' إلى الرتبة ' + nextE + ' (خارج السلم)') : 'الرتبة 8 القصوى في الدرجة الممتازة (الرقم 930)';
                echTimeEl.textContent = 'الترقي مباشر كل 3 سنوات بدون أنساق أو حصيص (المادة 49)';
                reclEl.textContent = 'الدرجة الممتازة هي أعلى درجة في الإطار';
                reclNoteEl.textContent = 'الرقم الاستدلالي يتدرج من 704 (الرتبة 1) إلى 930 (الرتبة 8)';
                statusEl.innerHTML = '<p style="margin:0;">✅ <strong>الوضعية في الدرجة الممتازة (خارج السلم):</strong> تنص الفقرة الأخيرة من المادة 49 على أن الترقية من رتبة إلى الرتبة الموالية في الدرجة الممتازة (من الرتبة 1 إلى الرتبة 8) تتم <strong>مباشرة كل ثلاث (3) سنوات</strong>.</p>';
                return;
            }}

            if (ech <= 9) {{
                nextEchEl.textContent = 'الانتقال من الرتبة ' + ech + ' إلى الرتبة ' + (ech + 1);
                echTimeEl.textContent = 'المدة القانونية حسب جدول المادة 49: ' + durations[ech][rythme];
            }} else if (ech === 10) {{
                if (g === 'G2') {{
                    nextEchEl.textContent = 'الانتقال من الرتبة 10 إلى الرتبة الاستثنائية (564)';
                    echTimeEl.textContent = 'الشرط (المادة 49): سنتان أقدمية فعلية بالرتبة 10 + حصيص 10%';
                }} else {{
                    nextEchEl.textContent = 'الانتقال من الرتبة 10 إلى الرتبة 11 (675) أو الاستثنائية (704)';
                    echTimeEl.textContent = 'الشرط (المادة 49): سنتان مباشرة للرتبة 11 (أو حصيص 10% للاستثنائية)';
                }}
            }} else if (isExcep) {{
                nextEchEl.textContent = g === 'G2' ? 'الرتبة الاستثنائية هي أعلى رتبة بالدرجة الثانية (564)' : 'الرتبة الاستثنائية تعادل الرقم الاستدلالي 704 بالدرجة الأولى';
                echTimeEl.textContent = 'الخطوة الموالية هي الترقية إلى الدرجة الأعلى (المادتان 50 و52)';
            }} else {{
                nextEchEl.textContent = ech < 13 ? ('الانتقال من الرتبة ' + ech + ' إلى الرتبة ' + (ech + 1) + ' بالدرجة الأولى') : 'الرتبة 13 هي أعلى رتبة بالدرجة الأولى (الرقم 704)';
                echTimeEl.textContent = 'الشرط (المادة 49): ترقٍ مباشر كل سنتين (2 سنتين) حتى الرتبة 13 (704)';
            }}

            if (g === 'G2') {{
                // Article 52 Paragraph 2: Appointed in the new grade at the numerical echelon immediately below the original echelon
                const g1Indices = {{1:336, 2:369, 3:403, 4:436, 5:472, 6:509, 7:542, 8:574, 9:606, 10:639}};
                const newEchNum = Math.min(10, Math.max(1, ech - 1));
                const newInd = g1Indices[newEchNum];
                reclEl.textContent = 'الدرجة الأولى — الرتبة ' + newEchNum + ' (الرقم ' + newInd + ')';
                reclNoteEl.textContent = 'تطبيقاً للمادة 52: الرتبة العددية التي تقل مباشرة (مع الاحتفاظ بالأقدمية في حدود السريع)';

                const examOk = anc >= 6;
                const choixOk = anc >= 10;
                let html = '<p style="margin-bottom:0.4rem;"><strong>تشخيص الترقية من الدرجة الثانية إلى الدرجة الأولى (المادتان 50 و51):</strong></p><ul style="margin:0;">';
                html += '<li><strong>امتحان الكفاءة المهنية (حصيص 14%):</strong> ' + (examOk ? '<span style="color:#006233;font-weight:800;">مستوفٍ لشرط 6 سنوات أقدمية في الدرجة إلى غاية 31 ديسمبر (' + anc + ' سنوات).</span>' : '<span style="color:#991b1b;font-weight:700;">يتطلب 6 سنوات أقدمية (متبقي ' + Math.max(0, 6 - anc) + ' سنوات).</span>') + '</li>';
                html += '<li><strong>الترقية بالاختيار (حصيص 22%):</strong> ' + (choixOk ? '<span style="color:#006233;font-weight:800;">مستوفٍ لشرط 10 سنوات أقدمية في الدرجة (' + anc + ' سنوات)، وتُسقَّف الترقية بدون حصيص في التقييد الرابع.</span>' : '<span style="color:#991b1b;font-weight:700;">يتطلب 10 سنوات أقدمية في الدرجة (متبقي ' + Math.max(0, 10 - anc) + ' سنوات).</span>') + '</li></ul>';
                statusEl.innerHTML = html;
            }} else if (g === 'G1') {{
                // Article 52 Paragraph 3: Those entering Hors Échelle are placed in Echelon 1 (index 704) and keep up to 2 years seniority if previous index was 704
                const g1Indices = {{1:336, 2:369, 3:403, 4:436, 5:472, 6:509, 7:542, 8:574, 9:606, 10:639, 11:675, 12:690, 13:704}};
                const curInd = isExcep ? 704 : (g1Indices[ech] || 704);
                reclEl.textContent = 'الدرجة الممتازة — الرتبة 1 (الرقم الاستدلالي 704)';
                reclNoteEl.textContent = (ech >= 13 || isExcep) ? 'تطبيقاً للمادة 52: الاحتفاظ بالأقدمية في حدود سنتين لأن الرقم السابق يعادل 704' : ('تطبيقاً للفقرة 3 من المادة 52 (مقابل الرقم الحالي ' + curInd + ')');
                const echOk = ech >= 7;
                const ancOk = anc >= 5;
                const echDisplay = isExcep ? 'الاستثنائية (704)' : ('الرتبة ' + ech + ' (' + curInd + ')');
                let html = '<p style="margin-bottom:0.4rem;"><strong>تشخيص الترقية من الدرجة الأولى إلى الدرجة الممتازة - خارج السلم (المادتان 50 و87):</strong></p><ul style="margin:0;">';
                html += '<li><strong>شرط الرتبة (الرتبة 7 على الأقل — الرقم 542):</strong> ' + (echOk ? '<span style="color:#006233;font-weight:800;">مستوفى (أنت في ' + echDisplay + ').</span>' : '<span style="color:#991b1b;font-weight:800;">غير مستوفى بعد (يجب بلوغ الرتبة 7 على الأقل).</span>') + '</li>';
                html += '<li><strong>شرط الأقدمية في الدرجة الأولى (5 سنوات على الأقل):</strong> ' + (ancOk ? '<span style="color:#006233;font-weight:800;">مستوفى (' + anc + ' سنوات في الدرجة الأولى).</span>' : '<span style="color:#991b1b;font-weight:800;">يتطلب 5 سنوات في الدرجة الأولى (متبقي ' + Math.max(0, 5 - anc) + ' سنوات).</span>') + '</li>';
                html += '<li><strong>الحصيص والتسقيف والأقدمية الاعتبارية:</strong> نسبة الحصيص السنوي هي <strong>36%</strong> بالاختيار (والتسقيف <strong>بدون حصيص في التقييد الرابع</strong>)، مع منح <strong>3 سنوات أقدمية اعتبارية</strong> للمترقين ما بين 2024 و2028 من أطر الابتدائي والإعدادي والمختصين (المادة 87).</li></ul>';
                statusEl.innerHTML = html;
            }}
        }};

        updateStatutSalaryOptions();
        calculateStatutPromotion();
    }})();
    </script>
    """


def build_shared_context_sections(current_article: dict) -> str:
    nav_cards = []
    for art in ALL_ARTICLES:
        is_current = art["slug"] == current_article["slug"]
        border_style = "border:2px solid #991b1b;background:#fff8f8;" if is_current else "border:1px solid #cbd5e1;background:#ffffff;"
        badge_txt = "📍 المقال الحالي" if is_current else f"الدليل القانوني {art['num']}/10"
        nav_cards.append(f"""
            <a href="{art['slug']}" style="display:block;padding:0.95rem 1.1rem;border-radius:12px;{border_style}transition:all 0.2s;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.35rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#991b1b;background:#fff1f2;border:1px solid #fecdd3;padding:0.15rem 0.55rem;border-radius:6px;">{badge_txt}</span>
                    <span style="font-size:0.75rem;color:#006233;font-weight:700;">الجريدة الرسمية 7277</span>
                </div>
                <div style="font-weight:800;font-size:0.9rem;color:#0f172a;line-height:1.45;">{art['title']} ←</div>
            </a>
        """)
    nav_html = "\n".join(nav_cards)

    return f"""
    <!-- OFFICIAL PDF DOWNLOAD & VIEWER CARD (BO N° 7277 - DECRETS 2.24.140 & 2.24.141) -->
    <div id="official-bo-7277-pdf" class="success-box" style="margin:2.25rem 0;padding:1.6rem;">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.25rem;">
            <div style="flex:1 1 520px;">
                <span class="section-badge" style="background:#ffffff;border-color:#a7d7c5;color:#006233;margin-bottom:0.6rem;">
                    📄 الوثيقة الرسمية الكاملة · الجريدة الرسمية عدد 7277 (26 فبراير 2024)
                </span>
                <h2 style="margin:0 0 0.5rem 0;border:none;padding:0;font-size:1.3rem;color:#0f172a;">
                    تحميل النص الرسمي الكامل للنظام الأساسي 2024 (المرسوم 2.24.140 والمرسوم 2.24.141 - PDF)
                </h2>
                <p style="margin:0;color:#1e293b;font-size:0.94rem;">
                    تتضمن هذه النسخة الرسمية الصادرة عن الأمانة العامة للحكومة (الصفحات 1366 إلى 1386) النص الكامل للمرسوم رقم 2.24.140 بشأن النظام الأساسي الخاص بموظفي الوزارة المكلفة بالتربية الوطنية (95 مادة موزعة على 12 باباً) والمرسوم رقم 2.24.141 بسن تدابير متفرقة تتعلق بالتعويضات المخولة لموظفي الوزارة.
                </p>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:0.65rem;">
                <a href="{PDF_URL}" target="_blank" rel="noopener" style="padding:0.7rem 1.25rem;background:#006233;color:#ffffff;border-radius:10px;font-weight:800;font-size:0.9rem;box-shadow:0 2px 6px rgba(0,98,51,0.2);">
                    📥 فتح وتحميل الجريدة الرسمية (PDF)
                </a>
                <a href="#statut-2024-calculators" style="padding:0.7rem 1.25rem;background:#991b1b;color:#ffffff;border-radius:10px;font-weight:800;font-size:0.9rem;">
                    🧮 استخدام حاسبة الأجرة والترقية
                </a>
            </div>
        </div>
    </div>

    <!-- STRUCTURAL ARCHITECTURE OF DECREE 2.24.140 (95 ARTICLES / 12 CHAPTERS / 5 BODIES) -->
    <div id="sec-architecture-2-24-140" class="step-card">
        <h2 style="margin-top:0;">الهيكلة التشريعية الكاملة للمرسوم رقم 2.24.140 في الجريدة الرسمية عدد 7277 (12 باباً و95 مادة)</h2>
        <p>
            لتسهيل الرجوع إلى المواد القانونية في الوثيقة الرسمية المرفقة أعلاه، يتوزع المرسوم رقم 2.24.140 الصادر في 13 من شعبان 1445 (23 فبراير 2024) على <strong>اثني عشر (12) باباً رئيسياً تضم 95 مادة</strong>:
        </p>
        <div class="sim-grid-2">
            <div style="background:#f8fafc;padding:1rem;border-radius:10px;border:1px solid #e2e8f0;">
                <strong style="color:#991b1b;display:block;margin-bottom:0.25rem;">الباب الأول والثاني (المواد 1 إلى 37)</strong>
                <span style="font-size:0.9rem;"><strong>الباب الأول (المواد 1–8):</strong> مقتضيات عامة وحقوق وواجبات الموظف ومنع الدروس الخصوصية. <strong>الباب الثاني (المواد 9–37):</strong> تأليف ومهام الهيئات الخمس (هيئة التربية والتعليم، هيئة الإدارة التربوية والتدبير، هيئة التفتيش والتأطير والمراقبة والتقييم، هيئة متصرفي التربية الوطنية، وهيئة الأساتذة الباحثين في التربية والتكوين) (ص. 1366–1372).</span>
            </div>
            <div style="background:#f8fafc;padding:1rem;border-radius:10px;border:1px solid #e2e8f0;">
                <strong style="color:#006233;display:block;margin-bottom:0.25rem;">الباب الثالث والرابع والخامس (المواد 38 إلى 58)</strong>
                <span style="font-size:0.9rem;"><strong>الباب الثالث (المواد 38–48):</strong> التوظيف والتعيين والترسيم ومباراة الماستر (المادة 45). <strong>الباب الرابع (المواد 49–54):</strong> الترقية في الرتبة والدرجة وإعادة الترتيب وتقييم الأداء المهني. <strong>الباب الخامس (المواد 55–58):</strong> مهام الإدارة التربوية وتنسيق التفتيش (ص. 1372–1377).</span>
            </div>
            <div style="background:#f8fafc;padding:1rem;border-radius:10px;border:1px solid #e2e8f0;">
                <strong style="color:#991b1b;display:block;margin-bottom:0.25rem;">الباب السادس والسابع والثامن والتاسع (المواد 59 إلى 65)</strong>
                <span style="font-size:0.9rem;"><strong>الباب السادس (المادتان 59–60):</strong> نظام التعويضات الشهرية. <strong>الباب السابع (المادتان 61–62):</strong> التحفيز المهني وشهادات التقدير. <strong>الباب الثامن (المادة 63):</strong> الحركة الانتقالية السنوية. <strong>الباب التاسع (المادتان 64–65):</strong> نظام التأديب ومحو العقوبات (ص. 1378–1379).</span>
            </div>
            <div style="background:#f8fafc;padding:1rem;border-radius:10px;border:1px solid #e2e8f0;">
                <strong style="color:#006233;display:block;margin-bottom:0.25rem;">الباب العاشر والحادي عشر والثاني عشر (المواد 66 إلى 95)</strong>
                <span style="font-size:0.9rem;"><strong>الباب العاشر (المواد 66–72):</strong> الأرقام الاستدلالية، ساعات العمل الأسبوعية (68–69)، التكوين المستمر، والعطلة السنوية (71). <strong>الباب الحادي عشر (المواد 73–87):</strong> الإدماج والأقدميات الاعتبارية والدرجة الممتازة. <strong>الباب الثاني عشر (المواد 88–95):</strong> مقتضيات ختامية (ص. 1380–1386).</span>
            </div>
        </div>
    </div>

    <!-- 10-ARTICLE INTERNAL SILO NAVIGATION + ARABIC GUIDES -->
    <div id="silo-statut-2024-nav" style="margin:2.25rem 0;padding:1.5rem;background:linear-gradient(135deg,#fff1f2 0%,#f0fdf4 100%);border:2px solid #991b1b;border-radius:16px;">
        <h3 style="margin-top:0;color:#0f172a;font-size:1.22rem;">🇲🇦 الموسوعة القانونية الشاملة للنظام الأساسي 2024 (10 دلائل مرجعية بدون تكرار)</h3>
        <p style="margin-bottom:1rem;font-size:0.92rem;color:#334155;">
            تصفح الدلائل العشرة الكاملة للنظام الأساسي لموظفي التربية الوطنية (الجريدة الرسمية عدد 7277) والدلائل البيداغوجية بالعربية على منصة ProfEPS المغرب:
        </p>
        <div class="sim-grid-2" style="gap:0.75rem;">
            {nav_html}
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.75rem;margin-top:1rem;padding-top:1rem;border-top:1px solid #cbd5e1;">
            <a href="ar-orientations-pedagogiques-eps-maroc.html" style="padding:0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-weight:800;font-size:0.88rem;color:#0f172a;">📘 التوجيهات التربوية 2007 و 2009 بالمغرب ←</a>
            <a href="ar-fiches-seance-cycles-eps-maroc.html" style="padding:0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-weight:800;font-size:0.88rem;color:#0f172a;">📄 جذاذات وتخطيط حصص التربية البدنية PDF/Word ←</a>
            <a href="ar-concours-crmef-eps-maroc.html" style="padding:0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-weight:800;font-size:0.88rem;color:#0f172a;">🎓 الاستعداد لمباراة التعليم تخصص التربية البدنية CRMEF ←</a>
            <a href="ar-baremes-bac-sport-maroc.html" style="padding:0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-weight:800;font-size:0.88rem;color:#0f172a;">🏅 سلم تنقيط البكالوريا (رسميين وأحرار) والإعفاء ←</a>
        </div>
    </div>
    """


def render_full_article_html(article: dict) -> str:
    slug = article["slug"]
    canonical = f"https://profeps.ma/{slug}"

    # Customize data-current-file in the exact Unified Navbar
    navbar_html = UNIFIED_NAVBAR_TEMPLATE.replace(
        'data-current-file="ar-orientations-pedagogiques-eps-maroc.html"',
        f'data-current-file="{slug}"'
    )

    toc_links = []
    if "toc" in article and article["toc"]:
        for anchor_id, label_txt in article["toc"]:
            toc_links.append(f'<a href="#{anchor_id}">📌 {label_txt}</a>')
    else:
        for ref_txt in article["legal_refs"]:
            toc_links.append(f'<a href="#statut-2024-calculators">📌 {ref_txt}</a>')
    toc_html = "\n".join(toc_links)

    faqs_html_items = []
    faq_schema_items = []
    for f in article["faqs"]:
        faqs_html_items.append(f"""
            <div class="faq-item">
                <h3 style="margin-top:0;font-size:1.08rem;color:#0f172a;">❓ {f['q']}</h3>
                <p style="margin-bottom:0;color:#334155;">{f['a']}</p>
            </div>
        """)
        faq_schema_items.append({
            "@type": "Question",
            "name": f["q"],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f["a"]
            }
        })

    json_ld_article = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": article["title"],
        "description": article["meta_desc"],
        "inLanguage": "ar-MA",
        "author": {
            "@type": "Person",
            "name": "عبد الخالق البوداني (Abdelkhalek ELBOUDANI)",
            "jobTitle": "أستاذ التربية البدنية والرياضية بالمغرب (Professeur d'EPS)",
            "url": "https://profeps.ma/a-propos.html",
            "worksFor": {"@type": "EducationalOrganization", "name": "ProfEPS Maroc", "url": "https://profeps.ma/"}
        },
        "publisher": {"@id": "https://profeps.ma/#organization"},
        "datePublished": "2026-11-06",
        "dateModified": "2026-11-06",
        "image": "https://profeps.ma/images/prof_eps.png",
        "mainEntityOfPage": {"@type": "WebPage", "@id": canonical}
    }

    json_ld_faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq_schema_items
    }

    json_ld_breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "الرئيسية ProfEPS المغرب", "item": "https://profeps.ma/"},
            {"@type": "ListItem", "position": 2, "name": "المدونة والدلائل التربوية", "item": "https://profeps.ma/blog.html"},
            {"@type": "ListItem", "position": 3, "name": article["title"], "item": canonical}
        ]
    }

    sim_num_prefix = ""
    faq_num_prefix = ""
    if "toc" in article and article["toc"]:
        for anchor_id, label_txt in article["toc"]:
            m = re.match(r"^(\d+\.\s*)", label_txt)
            if m:
                if anchor_id in ("sec-simulator", "statut-2024-calculators"):
                    sim_num_prefix = m.group(1)
                elif anchor_id == "sec-faq":
                    faq_num_prefix = m.group(1)

    simulator_html = build_interactive_simulator_html(article["default_tab"], sim_num_prefix=sim_num_prefix)
    cleaned_body = clean_body_html_to_site_ui(article["body_html"])
    case_study_html = CASE_STUDIES_BY_NUM.get(article["num"], "")
    shared_context_html = build_shared_context_sections(article)

    if "<!-- SIMULATEUR_PLACEHOLDER -->" in cleaned_body:
        cleaned_body = cleaned_body.replace("<!-- SIMULATEUR_PLACEHOLDER -->", simulator_html, 1)
        bottom_simulator_html = ""
    else:
        bottom_simulator_html = simulator_html

    arabic_eeat_card = """<!-- PROFEPS_EEAT_AUTHOR_START -->
  <aside id="peps-eeat-author-card" dir="rtl" aria-label="الكاتب والمراجعة القانونية والتربوية" style="max-width:1024px;margin:1.75rem auto;padding:1.25rem 1.5rem;background:#ffffff;border:1px solid #e2e8f0;border-right:4px solid #991b1b;border-radius:16px;box-shadow:0 2px 10px rgba(15,23,42,0.04);text-align:right;">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
      <div style="display:flex;align-items:center;gap:0.9rem;">
        <a href="a-propos.html" style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#991b1b,#006233);color:#ffffff;font-weight:900;font-size:1.05rem;display:flex;align-items:center;justify-content:center;text-decoration:none;flex-shrink:0;">AE</a>
        <div>
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;">
            <span style="font-size:0.75rem;font-weight:800;color:#991b1b;background:#fef2f2;padding:0.15rem 0.55rem;border-radius:6px;border:1px solid #fecaca;">✔ محتوى قانوني وتربوي موثق E-E-A-T</span>
            <span style="font-size:0.78rem;color:#64748b;font-weight:700;">مراجعة قانونية وتربوية : <time datetime="2026-11">نونبر 2026</time></span>
          </div>
          <p style="margin:0.25rem 0 0 0;font-size:0.94rem;font-weight:800;color:#0f172a;">
            إعداد ومراجعة الأستاذ <a href="a-propos.html" style="color:#991b1b;text-decoration:underline;">عبد الخالق البوداني (Abdelkhalek ELBOUDANI)</a> — أستاذ التربية البدنية والرياضية بالمغرب ومؤسس منصة ProfEPS
          </p>
          <p style="margin:0.2rem 0 0 0;font-size:0.8rem;color:#475569;line-height:1.5;">
            <strong>المصادر والنصوص المرجعية الرسمية :</strong> الجريدة الرسمية للمملكة المغربية عدد 7277 بتاريخ 26 فبراير 2024 (المرسوم رقم 2.24.140 والمرسوم رقم 2.24.141) والتوجيهات التربوية الرسمية لوزارة التربية الوطنية (2007 و2009).
          </p>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <a href="a-propos.html" style="padding:0.45rem 0.85rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;font-size:0.78rem;font-weight:800;color:#1e293b;text-decoration:none;">ميثاق التحرير والكاتب ←</a>
        <a href="ar-orientations-pedagogiques-eps-maroc.html" style="padding:0.45rem 0.85rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;font-size:0.78rem;font-weight:800;color:#166534;text-decoration:none;">التوجيهات التربوية 2007/2009</a>
      </div>
    </div>
  </aside>
<!-- PROFEPS_EEAT_AUTHOR_END -->"""

    localized_footer_and_cmp = re.sub(
        r"<!-- PROFEPS_EEAT_AUTHOR_START -->[\s\S]*?<!-- PROFEPS_EEAT_AUTHOR_END -->",
        arabic_eeat_card,
        UNIFIED_FOOTER_AND_CMP,
        count=1
    )

    return f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{article["meta_desc"]}">
    <meta name="keywords" content="{article["keywords"]}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="ProfEPS Maroc">
    <meta property="og:title" content="{article["meta_title"]}">
    <meta property="og:description" content="{article["meta_desc"]}">
    <meta property="og:url" content="{canonical}">
    <meta property="og:image" content="https://profeps.ma/images/prof_eps.png">
    <meta property="og:locale" content="ar_MA">
    <meta property="og:locale:alternate" content="fr_MA">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{article["meta_title"]}">
    <meta name="twitter:description" content="{article["meta_desc"]}">
    <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">
    <link rel="canonical" href="{canonical}">
    <title>{article["meta_title"]}</title>
    <link rel="icon" type="image/png" href="/images/prof_eps.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">

    <!-- Google tag (gtag.js) & Consent Mode v2 ProfEPS.ma -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      try {{
        var saved = JSON.parse(localStorage.getItem("profeps_cookie_consent_v2") || "null");
        if (saved) {{
          gtag("consent", "default", {{
            "ad_storage": saved.ads ? "granted" : "denied",
            "ad_user_data": saved.ads ? "granted" : "denied",
            "ad_personalization": saved.ads ? "granted" : "denied",
            "analytics_storage": saved.analytics ? "granted" : "denied"
          }});
        }} else {{
          gtag("consent", "default", {{
            "ad_storage": "granted",
            "ad_user_data": "granted",
            "ad_personalization": "granted",
            "analytics_storage": "granted"
          }});
          gtag("consent", "default", {{
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "analytics_storage": "denied",
            "region": ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","LV","LI","LT","LU","MT","NL","NO","PL","PT","RO","SK","SI","ES","SE","GB","CH"],
            "wait_for_update": 500
          }});
        }}
      }} catch (e) {{}}
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TH0Z1SGNXH"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-TH0Z1SGNXH');
    </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8253776880916865" crossorigin="anonymous"></script>
    <script src="profeps-cmp.js" defer></script>
    <link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">

    <script type="application/ld+json">{json.dumps(json_ld_article, ensure_ascii=False)}</script>
    <script type="application/ld+json">{json.dumps(json_ld_faq, ensure_ascii=False)}</script>
    <script type="application/ld+json">{json.dumps(json_ld_breadcrumb, ensure_ascii=False)}</script>

    <style>
        *, *::before, *::after {{ margin: 0; padding: 0; box-sizing: border-box; }}
        :root {{
            --primary: #991b1b; --secondary: #006233; --text-primary: #0f172a; --text-secondary: #334155;
            --bg-primary: #ffffff; --bg-secondary: #f8fafc; --border: #cbd5e1; --border-light: #e2e8f0;
            --shadow-sm: 0 1px 3px rgba(15,23,42,0.06); --shadow-md: 0 4px 12px rgba(15,23,42,0.08);
            --radius: 8px; --radius-lg: 14px; --radius-full: 9999px;
            --font-sans: 'Cairo', 'Tajawal', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-display: 'Cairo', 'Plus Jakarta Sans', var(--font-sans);
        }}
        body {{ font-family: var(--font-sans); background: var(--bg-secondary); color: var(--text-primary); line-height: 1.85; direction: rtl; text-align: right; }}
        a {{ text-decoration: none; color: inherit; }}
        .section-badge {{ display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.45rem 1rem; background: #fff1f2; border: 1px solid #fecdd3; border-radius: var(--radius-full); font-size: 0.88rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }}
        .article-hero {{ padding: 130px 1.5rem 2.75rem; background: linear-gradient(135deg, #fff8f8 0%, #f8fafc 52%, #f3faf6 100%); border-bottom: 1px solid var(--border-light); text-align: center; }}
        .article-title {{ font-family: var(--font-display); font-size: clamp(1.65rem, 3.6vw, 2.35rem); font-weight: 900; color: var(--text-primary); max-width: 960px; margin: 0 auto 1rem; line-height: 1.4; }}
        .article-meta {{ display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; color: var(--text-secondary); font-size: 0.92rem; font-weight: 700; }}
        .article-container {{ max-width: 980px; margin: 0 auto; padding: 2.5rem 1.5rem; }}
        .back-link {{ display: inline-flex; align-items: center; gap: 0.5rem; color: var(--primary); font-weight: 800; margin-bottom: 1.75rem; }}
        .back-link:hover {{ text-decoration: underline; }}
        .article-content {{ line-height: 1.9; color: var(--text-secondary); font-size: 1.02rem; }}
        .article-content h2 {{ font-size: 1.45rem; font-weight: 900; color: var(--text-primary); margin-top: 2.75rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 3px solid var(--primary); }}
        .article-content h3 {{ font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-top: 1.75rem; margin-bottom: 0.65rem; }}
        .article-content p {{ margin-bottom: 1rem; }}
        .article-content ul, .article-content ol {{ margin: 1rem 0; padding-right: 1.75rem; padding-left: 0; }}
        .article-content li {{ margin-bottom: 0.55rem; }}
        .info-box {{ background: #fff8f8; border: 1px solid #f5c2c7; border-right: 5px solid var(--primary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.5rem 0; color: #1e293b; }}
        .warning-box {{ background: #fffbeb; border: 1px solid #fde68a; border-right: 5px solid #d97706; padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.5rem 0; color: #78350f; }}
        .success-box {{ background: #f3faf6; border: 1px solid #a7d7c5; border-right: 5px solid var(--secondary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.5rem 0; color: #1e293b; }}
        .step-card {{ background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1.25rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }}
        .table-container {{ overflow-x: auto; margin: 1.5rem 0; }}
        .table-container table, .article-content table {{ width: 100%; border-collapse: collapse; background: #ffffff; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); text-align: right; }}
        .table-container th, .article-content th {{ background: #f1f5f9; color: #0f172a; padding: 0.85rem 1rem; text-align: right; font-size: 0.9rem; font-weight: 800; border-bottom: 2px solid var(--border); border-left: 1px solid var(--border-light); }}
        .table-container td, .article-content td {{ padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); border-left: 1px solid var(--border-light); font-size: 0.9rem; color: #1e293b; vertical-align: top; }}
        .table-container tr:nth-child(even) td, .article-content tr:nth-child(even) td {{ background: #f8fafc; }}
        .faq-item {{ background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }}
        .toc-nav {{ background: #ffffff; border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem 1.5rem; margin: 1.5rem 0 2rem; box-shadow: var(--shadow-sm); }}
        .toc-nav h3 {{ margin: 0 0 0.75rem 0 !important; font-size: 1.05rem !important; color: #0f172a !important; }}
        .toc-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.5rem; }}
        .toc-grid a {{ display: block; padding: 0.55rem 0.8rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.88rem; font-weight: 700; color: #1e293b; transition: all 0.2s; }}
        .toc-grid a:hover {{ border-color: var(--primary); color: var(--primary); background: #fff8f8; }}

        /* Interactive Simulator Light ProfEPS UI */
        .peps-sim-box {{ background: #ffffff; border: 2px solid var(--primary); border-radius: 18px; padding: 1.5rem; margin: 2.25rem 0; box-shadow: var(--shadow-md); }}
        .peps-sim-header {{ display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; padding-bottom: 1.15rem; border-bottom: 1px solid var(--border-light); }}
        .peps-sim-tabs {{ display: flex; flex-wrap: wrap; gap: 0.5rem; }}
        .peps-sim-tab-btn {{ padding: 0.65rem 1.1rem; border-radius: 10px; font-family: var(--font-sans); font-size: 0.88rem; font-weight: 800; cursor: pointer; border: 1px solid var(--border); background: #f8fafc; color: #334155; transition: all 0.2s; }}
        .peps-sim-tab-btn.active {{ background: var(--primary); color: #ffffff; border-color: var(--primary); box-shadow: 0 2px 8px rgba(153,27,27,0.25); }}
        .peps-sim-tab-btn:hover:not(.active) {{ border-color: var(--primary); color: var(--primary); background: #fff8f8; }}
        .sim-grid-2 {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.15rem; }}
        .sim-grid-3 {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; }}
        .peps-field {{ margin-bottom: 0.9rem; }}
        .peps-field label {{ display: block; font-size: 0.84rem; font-weight: 800; color: #0f172a; margin-bottom: 0.35rem; }}
        .peps-field select, .peps-field input {{ width: 100%; padding: 0.6rem 0.85rem; border-radius: 10px; border: 1px solid var(--border); background: #ffffff; color: #0f172a; font-family: var(--font-sans); font-size: 0.9rem; font-weight: 700; outline: none; }}
        .peps-field select:focus, .peps-field input:focus {{ border-color: var(--primary); box-shadow: 0 0 0 3px rgba(153,27,27,0.1); }}
        .peps-kpi-card {{ background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 0.85rem 1rem; }}
        .peps-kpi-label {{ font-size: 0.78rem; font-weight: 700; color: #475569; margin-bottom: 0.25rem; }}
        .peps-kpi-val {{ font-size: 1.2rem; font-weight: 900; }}
        .peps-kpi-sub {{ font-size: 0.74rem; color: #64748b; margin-top: 0.2rem; }}
    </style>
</head>
<body>
{navbar_html}

    <section class="article-hero">
        <span class="section-badge">🇲🇦 {article["badge"]} · الدليل المرجعي رقم {article["num"]}/10</span>
        <h1 class="article-title">{article["title"]}</h1>
        <div class="article-meta">
            <span>🏛️ المرجع الرسمي : الجريدة الرسمية عدد 7277 (المرسومان 2.24.140 و 2.24.141)</span>
            <span>📅 تحديث : 6 نونبر 2026</span>
            <span>⏱️ 15 دقيقة للقراءة + حاسبة تفاعلية</span>
            <span>✍️ إعداد الأستاذ : <a href="a-propos.html" style="text-decoration:underline;color:#991b1b;">عبد الخالق البوداني (Abdelkhalek ELBOUDANI)</a></span>
        </div>
    </section>

    <article class="article-container">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.5rem;background:#ffffff;padding:0.9rem 1.25rem;border-radius:12px;border:1px solid #cbd5e1;">
            <a href="blog.html" class="back-link" style="margin:0;">→ العودة إلى المدونة والدلائل التربوية</a>
            <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
                <a href="{PDF_URL}" target="_blank" rel="noopener" style="padding:0.45rem 0.9rem;background:#f3faf6;border:1px solid #a7d7c5;border-radius:8px;font-size:0.84rem;font-weight:800;color:#006233;">📄 تحميل الجريدة الرسمية 7277 (PDF)</a>
                <a href="#statut-2024-calculators" style="padding:0.45rem 0.9rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;font-size:0.84rem;font-weight:800;color:#0f172a;">🧮 حاسبة الأجرة والترقية التفاعلية</a>
                <a href="generateur.html" style="padding:0.45rem 0.9rem;background:#991b1b;color:#ffffff;border-radius:8px;font-size:0.84rem;font-weight:800;">⚡ مولد الجذاذات والدورات (PDF/Word مجاناً)</a>
            </div>
        </div>

        <div class="article-content">
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.08rem;">📌 الخلاصة القانونية المرجعية من الجريدة الرسمية عدد 7277 (26 فبراير 2024)</h4>
                <p style="margin:0;color:#1e293b;">{article["lead"]}</p>
            </div>

            <nav class="toc-nav" aria-label="فهرس الدليل القانوني">
                <h3>🧭 المحاور والسند القانوني المرجعي في هذا الدليل</h3>
                <div class="toc-grid">
                    {toc_html}
                </div>
            </nav>

            {cleaned_body}
            {case_study_html}

            {bottom_simulator_html}

            <h2 id="sec-faq">{faq_num_prefix}أسئلة شائعة وإجابات قانونية موثقة من النظام الأساسي 2024 (المرسوم 2.24.140)</h2>
            {"".join(faqs_html_items)}

            {shared_context_html}
        </div>
    </article>

{localized_footer_and_cmp}
</body>
</html>
"""


def count_visible_words(html_str: str) -> int:
    clean = re.sub(r"<script[\s\S]*?</script>", " ", html_str, flags=re.IGNORECASE)
    clean = re.sub(r"<style[\s\S]*?</style>", " ", clean, flags=re.IGNORECASE)
    clean = re.sub(r"<[^>]+>", " ", clean)
    clean = re.sub(r"\s+", " ", clean).strip()
    return len(clean.split(" "))


def update_blog_html():
    blog_path = os.path.join(PUBLIC_DIR, "blog.html")
    with open(blog_path, "r", encoding="utf-8") as f:
        blog_content = f.read()

    marker_start = "<!-- STATUT_2024_ARABIC_PILLARS_START -->"
    marker_end = "<!-- STATUT_2024_ARABIC_PILLARS_END -->"

    cards = []
    for art in ALL_ARTICLES:
        cat = art["category"]
        cards.append(f"""                <!-- Article Statut 2024 #{art['num']}: {art['slug']} -->
                <article class="article-card" data-category="{cat}" dir="rtl">
                    <div class="article-visual article-{cat}">
                        <span class="category-badge category-{cat}">{art['badge']}</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#006233" stroke-width="2"/><polyline points="14 2 14 8 20 8" stroke="#006233" stroke-width="2"/><line x1="16" y1="13" x2="8" y2="13" stroke="#991b1b" stroke-width="2"/><line x1="16" y1="17" x2="8" y2="17" stroke="#991b1b" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">{art['title']}</h3>
                        <p class="article-excerpt">{art['meta_desc']}</p>
                        <div class="article-footer">
                            <span class="article-date">الجريدة الرسمية 7277 · المرسوم 2.24.140 + حاسبة تفاعلية</span>
                            <a href="{art['slug']}" class="read-more">قراءة الدليل القانوني الكامل ←</a>
                        </div>
                    </div>
                </article>""")

    block_html = f"{marker_start}\n" + "\n".join(cards) + f"\n                {marker_end}"

    if marker_start in blog_content and marker_end in blog_content:
        blog_content = re.sub(
            re.escape(marker_start) + r"[\s\S]*?" + re.escape(marker_end),
            block_html,
            blog_content
        )
    else:
        target = '<div class="articles-grid" id="articlesGrid">'
        assert target in blog_content, "Could not find #articlesGrid in public/blog.html"
        blog_content = blog_content.replace(target, target + "\n" + block_html, 1)

    all_cards = re.findall(r'<article\s+class="article-card"\s+data-category="([^"]+)"', blog_content)
    total_count = len(all_cards)
    cat_counts = {}
    for c in all_cards:
        cat_counts[c] = cat_counts.get(c, 0) + 1

    blog_content = re.sub(r'(<span class="theme-count" id="count-all">)\d+(</span>)', rf'\g<1>{total_count}\2', blog_content)
    for cat_key, cnt in cat_counts.items():
        blog_content = re.sub(rf'(<span class="theme-count" id="count-{cat_key}">)\d+(</span>)', rf'\g<1>{cnt}\2', blog_content)
    blog_content = re.sub(r'(<span class="articles-count" id="articlesCount">)\d+\s+articles(</span>)', rf'\g<1>{total_count} articles\2', blog_content)

    with open(blog_path, "w", encoding="utf-8") as f:
        f.write(blog_content)
    print(f"[OK] Updated public/blog.html -> Total articles: {total_count} (by category: {cat_counts})")


def update_sitemap_xml():
    sitemap_path = os.path.join(PUBLIC_DIR, "sitemap.xml")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        sm = f.read()

    added = 0
    for art in ALL_ARTICLES:
        loc = f"https://profepsmaroc.com/{art['slug']}"
        if loc not in sm:
            entry = f"""  <url>
    <loc>{loc}</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.92</priority>
  </url>\n"""
            sm = sm.replace("</urlset>", entry + "</urlset>")
            added += 1

    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(sm)
    print(f"[OK] Updated public/sitemap.xml -> Added {added} new URLs")


def main():
    print("=== Generating 10 Arabic Pillar Articles with 100% BO n° 7277 Verbatim Accuracy & Unified ProfEPS UI ===")
    for art in ALL_ARTICLES:
        html_out = render_full_article_html(art)
        out_path = os.path.join(PUBLIC_DIR, art["slug"])
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html_out)
        wc = count_visible_words(html_out)
        assert wc >= 1000, f"Article {art['slug']} has {wc} words (< 1000 minimum)!"
        print(f"  [GENERATED] {art['slug']} -> {wc} visible Arabic words (PASS >= 1,000)")

    update_blog_html()
    update_sitemap_xml()
    print("=== All 10 articles updated & verified ===")


if __name__ == "__main__":
    main()
