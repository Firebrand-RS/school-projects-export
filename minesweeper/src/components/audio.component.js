import { BaseComponent } from './base.component';

import clickVariant1SoundFile from '../assets/media/click-sound-variant-1.mp3';
import clickVariant2SoundFile from '../assets/media/click-sound-variant-2.mp3';
import winSoundFile from '../assets/media/win-sound.mp3';
import loseSoundFile from '../assets/media/lose-sound.mp3';

const fileList = [clickVariant1SoundFile, clickVariant2SoundFile, winSoundFile, loseSoundFile];

export class AudioComponent extends BaseComponent {
  muted = false;
  constructor({ className = [], src = fileList } = {}) {
    super({ className: [className, 'audio'], tagName: 'audio' });
    this.sounds = src;
    this.components = this.sounds.map((file) => {
      const audio = new BaseComponent({ tagName: 'audio' });
      audio.getElement().src = file;
      return audio;
    });
  }

  playLeftClickSound() {
    const componentToPlay = this.components[1];
    this.playSound(componentToPlay);
  }

  playRightClickSound() {
    const componentToPlay = this.components[0];
    this.playSound(componentToPlay);
  }

  playWinSound() {
    const componentToPlay = this.components[2];
    this.playSound(componentToPlay);
  }

  playLoseSound() {
    const componentToPlay = this.components[3];
    this.playSound(componentToPlay);
  }

  playSound(componentToPlay) {
    componentToPlay.getElement().muted = this.muted;
    componentToPlay.getElement().play();
  }

  mute() {
    this.muted = true;
  }

  unmute() {
    this.muted = false;
  }
}
