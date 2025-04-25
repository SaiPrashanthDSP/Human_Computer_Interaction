import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-voice-control',
  standalone: false,
  
  templateUrl: './voice-control.component.html',
  styleUrl: './voice-control.component.scss'
})
export class VoiceControlComponent {
  isListening = false;
  recognizedCommand = '';
  status = 'Ready for commands!';
  showPopup = false;
  popupTitle = '';
  popupMessage = '';

  // Command Processing
  startRecognition() {
    this.isListening = true;
    this.status = 'Listening for commands...';

    // Initialize speech recognition
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const command = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
      this.recognizedCommand = command;
      this.processCommand(command);
    };

    recognition.onend = () => {
      this.isListening = false;
      this.status = 'Listening stopped.';
    };

    recognition.start();
  }

  stopRecognition() {
    this.isListening = false;
    this.status = 'Recognition stopped.';
  }

  processCommand(command: string) {
    if (command.includes('scroll up')) {
      window.scrollBy(0, -50);
    } else if (command.includes('scroll down')) {
      window.scrollBy(0, 50);
    } else if (command.includes('go back')) {
      window.history.back();
    } else if (command.includes('reload page')) {
      window.location.reload();
    } else if (command.includes('search for')) {
      const query = command.split('search for')[1].trim();
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    } else if (command.includes('open')) {
      const website = command.split('open')[1].trim();
      window.open(`https://${website}`, '_blank');
    } else if (command.includes('open new tab')) {
      window.open('', '_blank');
    } else if (command.includes('close tab')) {
      window.close();
    } else if (command.includes('zoom in')) {
      document.body.style.zoom = '110%';
    } else if (command.includes('zoom out')) {
      document.body.style.zoom = '90%';
    } else if (command.includes('go to homepage')) {
      window.location.href = '/';
    } else if (command.includes('scroll to top')) {
      window.scrollTo(0, 0);
    
    } else if (command.includes('maximize window')) {
      window.resizeTo(screen.width, screen.height); // Maximize to full screen
    } else if (command.includes('show time')) {
      alert(new Date().toLocaleTimeString());
    } else {
      this.showSnackbar(`Command "${command}" not recognized.`);
    }
  }

  showSnackbar(message: string) {
    this.popupTitle = 'Hint';
    this.popupMessage = message;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }

  closePopup() {
    this.showPopup = false;
  }
}
