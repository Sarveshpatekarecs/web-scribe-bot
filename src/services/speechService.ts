
class SpeechService {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;
  private volume: number = 1.0;
  private rate: number = 1.0;
  private pitch: number = 1.0;

  constructor() {
    this.synth = window.speechSynthesis;
    this.initVoice();
  }

  private initVoice(): void {
    // Wait for voices to be loaded
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = this.setFemaleVoice.bind(this);
    } else {
      // For browsers that don't support onvoiceschanged
      setTimeout(() => this.setFemaleVoice(), 100);
    }
  }

  private setFemaleVoice(): void {
    const voices = this.synth.getVoices();
    
    // Try to find a female English voice
    // First look for voices explicitly marked as female
    let femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') && 
      voice.lang.startsWith('en')
    );
    
    // If no explicitly female voice is found, try common female voice names
    if (!femaleVoice) {
      const femaleNames = ['samantha', 'alice', 'victoria', 'lisa', 'karen', 'amy', 'sarah'];
      for (const name of femaleNames) {
        const voice = voices.find(v => v.name.toLowerCase().includes(name) && v.lang.startsWith('en'));
        if (voice) {
          femaleVoice = voice;
          break;
        }
      }
    }
    
    // Fallback to any English voice if no female voice is found
    if (!femaleVoice) {
      femaleVoice = voices.find(voice => voice.lang.startsWith('en'));
    }
    
    this.voice = femaleVoice || null;
    console.log("Selected voice:", this.voice?.name);
  }

  speak(text: string): void {
    if (!this.synth) return;
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    utterance.volume = this.volume;
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    
    this.synth.speak(utterance);
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setRate(rate: number): void {
    this.rate = Math.max(0.1, Math.min(2, rate));
  }

  setPitch(pitch: number): void {
    this.pitch = Math.max(0, Math.min(2, pitch));
  }
}

export const speechService = new SpeechService();
