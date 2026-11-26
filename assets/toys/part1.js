/* ==========================================================================
   Intro & Part 1 Interactive Labs (Chapters 01–09, 18 labs)
   ========================================================================== */
(function (N) {
  'use strict';

  const specs = [
    // Ch 01
    {
      id: 'ch01-fact-vs-frame', type: 'reframe',
      meta: { badge: 'Ch 01 · 事实与叙事分离', title: '同一事实，不同叙事：现实如何被重新着色', subtitle: '切换不同定义，观察同一条裸事实如何瞬间改变情绪与下一步行动。' },
      data: {
        fact: '新产品上线两周后，付费转化率为 0.8%，团队连续加班三周。',
        frames: [
          { name: '“项目失败”定义', emotion: '挫败、互相指责、急于止损逃离', script: '立刻归咎负责人，草率下架或彻底放弃。', check: '把早期验证数据直接当成终局宣判，过早关闭学习回路。', tone: 'danger' },
          { name: '“早期验证样本”定义', emotion: '冷静、好奇、聚焦定位瓶颈', script: '拆解漏斗断点，访谈前 20 位流失用户并迭代着陆页。', check: '既承认 0.8% 的事实，又保留可操作的改进空间。', tone: 'success' },
        ],
      },
    },
    {
      id: 'ch01-perception-layers', type: 'stepper',
      meta: { badge: 'Ch 01 · 认知加工单步', title: '从“裸事实”到“情绪与行动”的四层折射', subtitle: '逐步拆解为什么人并不是直接对客观事实本身做出反应。' },
      data: [
        { label: '1. 原始事实', title: '可录像、可核验的物理事件', body: '对方 24 小时未回复消息。', note: '事实本身不自带“轻视”或“背叛”的标签。' },
        { label: '2. 命名与归类', title: '写入叙事容器', body: '将其命名为“冷暴力”或“对方正忙于截止日”。', note: '不同命名决定了你接下来调用哪一套剧本。' },
        { label: '3. 剧本激活', title: '自动生成角色与情绪', body: '前者激活受害者/防御剧本，后者激活确认与边界沟通剧本。', note: '情绪是剧本的下游产物，而非凭空产生。' },
        { label: '4. 行动反馈', title: '行动制造新事实', body: '质问引发争吵（自我实现预言），确认则澄清了时间预期。', note: '叙事不仅解释现实，更在反向塑造现实。' },
      ],
    },
    // Ch 02
    {
      id: 'ch02-naming-power', type: 'compare',
      meta: { badge: 'Ch 02 · 命名权对比', title: '谁命名了问题，谁就掌握了议程', subtitle: '对比同一现象在两种命名下的道德权重与权力倾斜。' },
      data: [
        { tab: '“不服从” vs “提出风险”', left: '被命名为“不服从/刺头”：你自动落入辩护席，讨论焦点变成你的态度。', right: '被命名为“前置风险提示”：讨论焦点回到项目质量与止损方案。', takeaway: '争夺命名权的第一步，是拒绝在对方预设的标签里自证清白。' },
        { tab: '“太敏感” vs “边界提醒”', left: '被命名为“太敏感”：问题被压缩成你的个人情绪缺陷。', right: '被命名为“明确合作边界”：问题回到双方的规则约定。', takeaway: '命名决定了谁需要改变、谁可以免责。' },
      ],
    },
    {
      id: 'ch02-interpretive-shift', type: 'stepper',
      meta: { badge: 'Ch 02 · 解释权迁移', title: '夺回解释权的三步操作', subtitle: '面对不利命名时，如何平稳切换叙事坐标系。' },
      data: [
        { label: '1. 识别标签', title: '听出对方塞进来的隐含定义', body: '例如“你不够有团队精神”暗含了“无条件加班=忠诚”。', note: '先把标签从事实里剥离出来。' },
        { label: '2. 还原事实', title: '回到中性可核验描述', body: '“本周已完成全部排期任务，额外新增需求需要确认优先级。”', note: '中性事实会立刻抽空对方的情绪杠杆。' },
        { label: '3. 重新命名', title: '给出更精准的公共定义', body: '“这是排期容量管理问题，不是态度问题。”', note: '谁提供更清晰、更能解决问题的定义，解释权就会向谁倾斜。' },
      ],
    },
    // Ch 03
    {
      id: 'ch03-script-engine', type: 'reframe',
      meta: { badge: 'Ch 03 · 剧本切换器', title: '定义天然携带剧本：换一个词，换一整套动作', subtitle: '观察同一场争执在不同定义下如何触发截然不同的剧本。' },
      data: {
        fact: '合伙人在会议上公开否决了你准备一周的方案。',
        frames: [
          { name: '定义：权力羞辱', emotion: '屈辱、愤怒、报复欲', script: '私下结盟反击、消极怠工或立刻提散伙。', check: '高冲突剧本会迅速摧毁信任，却未检验方案本身是否有盲区。', tone: 'danger' },
          { name: '定义：高压共识对齐', emotion: '紧张但清醒、聚焦标准差异', script: '会后追问否决的 2 个核心标准，并约定下次会前先对齐底线。', check: '保留了纠偏空间，同时建立了更清晰的沟通规则。', tone: 'success' },
        ],
      },
    },
    {
      id: 'ch03-hidden-script-audit', type: 'compare',
      meta: { badge: 'Ch 03 · 隐性剧本审查', title: '日常高频词背后隐藏的行动剧本', subtitle: '拆开习以为常的日常说法，看看它们偷偷替你做了什么决定。' },
      data: [
        { tab: '“我拖延了”', left: '隐含剧本：道德自责 → 逼自己硬扛 → 继续逃避。', right: '改写定义：任务颗粒度过大 / 验收标准不清 → 拆出 15 分钟第一步。', takeaway: '道德化定义只产内耗，结构化定义才产行动。' },
        { tab: '“沉没成本不能浪费”', left: '隐含剧本：继续向错误方向追加投入。', right: '改写定义：已付出的学费 → 按未来净收益重新决策。', takeaway: '识别旧剧本，才能从自动巡航中醒来。' },
      ],
    },
    // Ch 04
    {
      id: 'ch04-nc-vs-storytelling', type: 'compare',
      meta: { badge: 'Ch 04 · 概念辨析', title: '叙事构造 vs. 讲故事 / 鸡汤包装', subtitle: '划清“结构化构造现实框架”与“情绪化编故事”的根本边界。' },
      data: [
        { tab: '与“讲故事”的区别', left: '讲故事追求好听、煽情、戏剧冲突，常常为了流畅而剪裁事实。', right: '叙事构造追求精准命名现实结构，为判断与行动提供可靠脚手架。', takeaway: '叙事构造的判准不是“动听”，而是“有效且经得起现实检验”。' },
        { tab: '与“自我催眠”的区别', left: '自我催眠靠否认事实换取短暂安慰。', right: '叙事构造严格锚定事实形态，只在合法解释空间内重构定义。', takeaway: '不尊重事实的叙事最终会被现实反噬。' },
      ],
    },
    {
      id: 'ch04-nc-workflow', type: 'stepper',
      meta: { badge: 'Ch 04 · 构造全流程', title: '叙事构造四步工作流', subtitle: '一图走通从混乱事件到清晰行动的完整操作。' },
      data: [
        { label: '1. 抽事实', title: '剥离情绪形容词', body: '只写时间、主体、可观察动作与结果。', note: '事实形态是一切构造的地基。' },
        { label: '2. 选容器', title: '锁定 13 个容器中的关键槽位', body: '判断当下最卡住的是处境、责任、原因还是方向。', note: '不必 13 个全填，先抓牵动全局的 2–3 个主容器。' },
        { label: '3. 写定义', title: '给出贴合事实的新命名', body: '明确新定义排除什么、保留什么、指向什么。', note: '好定义会自动给出下一步动作。' },
        { label: '4. 验剧本', title: '在现实行动中测试反馈', body: '看新剧本是否真的降低了内耗或推进了结果。', note: '现实反馈永远高于理论漂亮。' },
      ],
    },
    // Ch 05
    {
      id: 'ch05-fact-narrative-split', type: 'compare',
      meta: { badge: 'Ch 05 · 双形态分离', title: '事实形态 vs. 叙事形态分离器', subtitle: '训练一眼把混在一起的“发生了什么”与“你怎么定义它”拆成两列。' },
      data: [
        { tab: '职场反馈场景', leftTitle: '混杂表述', left: '“老板当众否定我，说明他早就想边缘化我。”', rightTitle: '双形态分离', right: '事实：老板在会上指出方案缺少预算对比；叙事：“他想边缘化我”是未经证实的动机推论。', takeaway: '先把推论放回“待验证假设”，再决定沟通动作。' },
        { tab: '学习受挫场景', leftTitle: '混杂表述', left: '“我刷了两套题还是错一半，我根本不是学英语的料。”', rightTitle: '双形态分离', right: '事实：两套题正确率 50%；叙事：“不是这块料”是把阶段样本泛化为永久身份。', takeaway: '事实提供定位坐标，失真叙事才会制造绝望。' },
      ],
    },
    {
      id: 'ch05-distortion-check', type: 'stepper',
      meta: { badge: 'Ch 05 · 失真检测', title: '叙事形态三类常见失真排查', subtitle: '检查你的叙事是否悄悄越过了事实边界。' },
      data: [
        { label: '1. 过度泛化', title: '把一次事件写成“总是/永远”', body: '单次失误被写成“我注定搞砸”。', note: '修复：加上时间边界与具体范围。' },
        { label: '2. 读心归因', title: '把外部行为直接等价于恶意动机', body: '未及时回复被直接等同于“蓄意轻视”。', note: '修复：区分可观察行为与不可见动机。' },
        { label: '3. 虚假二选一', title: '人为压缩行动剧本', body: '“要么彻底忍气吞声，要么立刻翻脸辞职”。', note: '修复：寻找第三种结构化协商选项。' },
      ],
    },
    // Ch 06
    {
      id: 'ch06-triad-stepper', type: 'stepper',
      meta: { badge: 'Ch 06 · 核心三元组', title: '容器 → 定义 → 剧本联动单步演示', subtitle: '理解三者分工：容器定位置，定义定性质，剧本定动作。' },
      data: [
        { label: '1. 容器（槽位）', title: '固定结构问题：例如“处境容器”', body: '容器只问“这是什么性质的局面”，不预设立场。', note: '13 个容器构成稳定的底层操作盘。' },
        { label: '2. 定义（内容）', title: '写入判断：例如“资源紧缩下的过渡期”', body: '同一个槽位，可以写入截然不同的定义。', note: '改变定义是杠杆率最高的认知操作。' },
        { label: '3. 剧本（输出）', title: '派生动作：保守现金流 + 压缩非核心开支', body: '一旦接受该定义，对应剧本几乎会自动接管决策。', note: '检查剧本好不好用，就能反推定义有没有写偏。' },
      ],
    },
    {
      id: 'ch06-slot-swap', type: 'reframe',
      meta: { badge: 'Ch 06 · 槽位替换实验', title: '同一“时间容器”，不同定义引发的剧本对比', subtitle: '观察切换时间定义如何立刻改变紧迫感与策略。' },
      data: {
        fact: '你今年 32 岁，准备从传统运营转向 AI 产品方向。',
        frames: [
          { name: '定义：错过了黄金窗口', emotion: '恐慌、羞耻、急功近利', script: '花大钱买焦虑课、不敢从基础做起、三个月无果就放弃。', check: '人为制造末日时钟，反而消耗了真正需要的积累时间。', tone: 'danger' },
          { name: '定义：复利迁移的起点期', emotion: '笃定、务实、节奏可控', script: '用旧业务理解结合新工具做 3 个真实作品集，按季度迭代。', check: '把时间定义为“可复用的资产期”，行动立刻落地。', tone: 'success' },
        ],
      },
    },
    // Ch 07
    {
      id: 'ch07-13-containers-browser', type: 'compare',
      meta: { badge: 'Ch 07 · 十三容器速查', title: '十三个核心容器四大分组速查器', subtitle: '按坐标、因果、驱动、导航四组快速掌握全书核心容器盘。' },
      data: [
        { tab: '坐标层（3 个）', left: '主体（谁在做/谁承受）· 时间（处于哪一阶段）· 处境（面临什么局面）', right: '决定了故事的舞台边界与主角权限。', takeaway: '当局面混乱时，先校准这三个坐标容器。' },
        { tab: '因果层（3 个）', left: '行为（具体动作）· 结果（产出状态）· 原因（为何如此）', right: '决定了复盘是否客观、能否找到真杠杆。', takeaway: '把行为和结果拆开，避免用运气好坏倒推动作对错。' },
        { tab: '驱动层（4 个）', left: '动机（深层推力）· 意图（当下打算）· 目标（可衡量终点）· 责任（谁来担责）', right: '决定了关系边界与组织协作是否清晰。', takeaway: '人际冲突十有八九来自混淆“动机猜测”与“责任划分”。' },
        { tab: '导航层（3 个）', left: '价值（值得与否）· 意义（为何重要）· 方向（长期去向）', right: '决定了在多目标冲突时如何取舍。', takeaway: '方向与价值稳定，局部挫折才不会击穿整个人。' },
      ],
    },
    {
      id: 'ch07-container-router', type: 'stepper',
      meta: { badge: 'Ch 07 · 容器定位练习', title: '面对一句模糊抱怨，快速定位主容器', subtitle: '演练如何把日常情绪话语翻译回精准的容器坐标。' },
      data: [
        { label: '原句', title: '“我付出这么多，结果没人看见，太没意思了。”', body: '一句话里同时混杂了行为、结果、价值与意义。', note: '不拆开就只能陷入整体无力感。' },
        { label: '拆出主容器', title: '结果容器 + 责任/分配容器 + 价值容器', body: '分别追问：成果是否可量化（结果）？展示机制归谁（责任）？这套标准我是否认同（价值）？', note: '每个容器对应完全不同的解法。' },
        { label: '生成动作', title: '先改成果可见度，再评估平台是否匹配价值标准', body: '把情绪抱怨变成两步清晰排查。', note: '容器的价值在于让模糊痛苦变成可解问题。' },
      ],
    },
    // Ch 08
    {
      id: 'ch08-container-domino', type: 'stepper',
      meta: { badge: 'Ch 08 · 联动多米诺', title: '容器联动效应：改一个，动一串', subtitle: '观察“原因容器”的一处改动如何连锁改写责任、情绪与方向。' },
      data: [
        { label: '起点：原因', title: '把“业绩下滑”从“我能力不行”改为“渠道红利见顶”', body: '原因容器从纯个人归因切换为结构+个人双归因。', note: '第一步就改变了整个局面的重心。' },
        { label: '联动：责任', title: '责任从“独自背锅自责”变为“共探新渠道”', body: '责任边界立刻清晰，不再承担超出控制范围的外部周期。', note: '责任容器紧随原因容器联动。' },
        { label: '联动：方向', title: '方向从“硬卷旧渠道”切换为“测试 2 个新流量入口”', body: '整条行动剧本被彻底重写。', note: '找准高杠杆上游容器，就能四两拨千斤。' },
      ],
    },
    {
      id: 'ch08-conflict-pairs', type: 'compare',
      meta: { badge: 'Ch 08 · 容器冲突诊断', title: '最容易互相打架的三组容器关系', subtitle: '识别内部撕裂背后的容器错位。' },
      data: [
        { tab: '目标 vs. 价值', left: '目标容器写着“三年财务自由”，价值容器却极度看重自由时间与健康。', right: '结果：一边逼自己拼命，一边强烈反感当下生活。', takeaway: '目标必须服从价值排序，否则越努力越内耗。' },
        { tab: '意图 vs. 结果', left: '自己只看“我意图是好的”，对方只看“实际结果造成了伤害”。', right: '结果：鸡同鸭讲，双方都觉得委屈。', takeaway: '修复关系时必须先承接结果，再澄清意图。' },
      ],
    },
    // Ch 09
    {
      id: 'ch09-definition-quality-sim', type: 'slider_quality',
      meta: { badge: 'Ch 09 · 定义质量评估器', title: '定义质量四维体检仪（事实度 / 清晰度 / 行动度 / 抗偏置）', subtitle: '拖动四个维度参数，检验一个定义究竟是高质量脚手架还是空洞口号。' },
    },
    {
      id: 'ch09-good-vs-bad-def', type: 'compare',
      meta: { badge: 'Ch 09 · 优劣定义对照', title: '空洞定义 vs. 高质量可执行定义', subtitle: '通过实例感受什么叫“一听就能指导行动的定义”。' },
      data: [
        { tab: '自我定位', leftTitle: '低质定义', left: '“我是一个追求极致的人。”（不可证伪、不指导取舍）', rightTitle: '高质定义', right: '“我在核心交付上守住 90 分底线，在非核心杂务上允许 60 分快速过关。”', takeaway: '好定义必须自带边界与取舍标准。' },
        { tab: '合作关系', leftTitle: '低质定义', left: '“我们是志同道合的好兄弟。”（一遇利益立刻模糊）', rightTitle: '高质定义', right: '“我们是权责清晰、按里程碑结算的长期协作者。”', takeaway: '清晰定义不是冷漠，而是关系的防撞护栏。' },
      ],
    },
  ];

  specs.forEach((s) => {
    if (s.type === 'compare') N.registerCompare(s.id, s.meta, s.data);
    else if (s.type === 'stepper') N.registerStepper(s.id, s.meta, s.data);
    else if (s.type === 'reframe') N.registerReframe(s.id, s.meta, s.data);
    else if (s.type === 'slider_quality') {
      N.register(s.id, s.meta, (root, { h, slider, meter }) => {
        const st = { fact: 80, clarity: 75, action: 70, bias: 65 };
        const m = meter({ label: '定义综合质量分', value: 73, tone: 'success' });
        const out = h('div', { class: 'nc-callout' });
        function upd() {
          const score = Math.round((st.fact + st.clarity + st.action + st.bias) / 4);
          const tone = score >= 75 ? 'success' : score >= 50 ? 'warn' : 'danger';
          m.update(score, tone);
          out.className = `nc-callout tone-${tone}`;
          out.innerHTML = st.fact < 45
            ? '<strong>失真警报：</strong>事实贴合度过低，再漂亮的定义也只是脱离现实的自我催眠。'
            : st.action < 45
            ? '<strong>空洞警报：</strong>缺乏行动指向，定义沦为装饰性口号。'
            : `<strong>质量评分 ${score}/100：</strong>该定义兼顾事实边界与行动杠杆，可用于指导现实决策。`;
        }
        const s1 = slider({ label: '事实贴合度', min: 10, max: 100, unit: '%', value: st.fact, onChange: (v) => { st.fact = v; upd(); } });
        const s2 = slider({ label: '边界清晰度', min: 10, max: 100, unit: '%', value: st.clarity, onChange: (v) => { st.clarity = v; upd(); } });
        const s3 = slider({ label: '行动可调用度', min: 10, max: 100, unit: '%', value: st.action, onChange: (v) => { st.action = v; upd(); } });
        const s4 = slider({ label: '抗自我欺骗度', min: 10, max: 100, unit: '%', value: st.bias, onChange: (v) => { st.bias = v; upd(); } });
        upd();
        root.append(h('div', { class: 'nc-grid-2' }, s1, s2, s3, s4), m, out);
      });
    }
  });
})(window.NarrativeToys);
