import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { TextBlueDirective } from './Directives/Text-Color Directive/text-blue.directive';
import { WordWrapPipe } from './Pipes/Word Wrap Pipe/word-wrap.pipe';
@NgModule({
  declarations: [SharedComponent, TextBlueDirective, WordWrapPipe],
  imports: [CommonModule, SharedRoutingModule, HttpClientModule],
  exports: [TextBlueDirective, WordWrapPipe],
})
export class SharedModule {}
