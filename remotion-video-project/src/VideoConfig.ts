/**
 * 视频配置文件
 * 
 * 说明：此文件会根据用户需求动态生成，不使用固定模板
 * 每次制作视频时，AI 会根据【画面增强提示词】自动更新此配置
 */

export const videoConfig = {
  // ====== 基本信息 ======
  title: '小哈米出道了！',
  subtitle: '现在可以帮你制作视频啦～',
  duration: 8,

  // ====== 视觉效果（小哈米主题色）======
  backgroundColor: '#1a1a2e',   // 深蓝紫色背景
  textColor: '#FF9500',        // 橙色主文字（小哈米色）
  accentColor: '#FF6B35',      // 珊瑚橙强调色

  // ====== 显示控制 ======
  showSubtitle: true,

  // ====== 动画设置 ======
  enterAnimation: 'spring',

  // ====== 背景装饰动画 ======
  // 可选: 'gradient' | 'shapes' | 'grid' | 'none'
  backgroundAnimation: 'shapes',

  // ====== 粒子效果 ======
  // 显示粒子数量（0表示关闭）
  particleCount: 8,
  particleStartFrame: 30,

  // ====== 装饰线条 ======
  // 是否显示标题上方的装饰线条
  showDecorationLine: true,
  decorationLineStartFrame: 5,

  // ====== 光晕效果 ======
  // 是否显示发光效果
  showGlow: true,
  glowIntensity: 0.6,

  // ====== 脉冲效果 ======
  // 是否显示向外扩散的脉冲
  showPulse: true,
  pulseStartFrame: 20,

  // ====== 旋转光环 ======
  // 是否显示旋转光环
  showRotatingRing: true,
  rotatingRingSize: 280,

  // ====== 背景音乐（支持实时配置）======
  // 是否启用背景音乐
  enableAudio: true,            // 默认启用背景音乐
  audioPath: './bg-music.mp3',  // 音乐文件路径（相对于 src/ 目录）
  audioVolume: 0.5,             // 音量（0-1），0.5表示50%
  audioFadeIn: 5,               // 淡入帧数
  audioFadeOut: 5,              // 淡出帧数

  // ====== 尺寸（竖屏）======
  width: 1080,
  height: 1920,
};