class AudioAlarmService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private intervalId: number | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playSingleBeep() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Hospital / Reception dual tone chime
      osc.frequency.setValueAtTime(880, ctx.currentTime); // Note A5
      osc.frequency.exponentialRampToValueAtTime(587.33, ctx.currentTime + 0.18); // Note D5

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  }

  public startContinuousAlarm(intervalMs: number = 3200) {
    if (this.intervalId !== null) return;
    this.playSingleBeep();
    this.intervalId = window.setInterval(() => {
      this.playSingleBeep();
    }, intervalMs);
  }

  public stopAlarm() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAlarm();
    }
  }

  public isAlarmRunning(): boolean {
    return this.intervalId !== null;
  }
}

export const audioAlarm = new AudioAlarmService();