import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoomTypesService } from '../services/public/room-types-service';
import { RoomType } from '../shared/types';
import { HomeBookingTestPanelComponent } from './booking-test-panel/booking-test-panel';
import { HomeContactSectionComponent } from './contact-section/contact-section';
import { HomeHeroFlexComponent } from './hero-flex/hero-flex';
import { HomeHighlightsSectionComponent } from './highlights-section/highlights-section';
import { HomeNavBarComponent } from './nav-bar/nav-bar';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeNavBarComponent,
    HomeHeroFlexComponent,
    HomeHighlightsSectionComponent,
    HomeContactSectionComponent,
    HomeBookingTestPanelComponent,
  ],
  templateUrl: './home.html',
})
export class HomePageComponent {
  private readonly router = inject(Router);
  private readonly roomTypesService = inject(RoomTypesService);

  readonly roomTypesState = this.roomTypesService.roomTypesState;
  
  private readonly loadRoomTypesEffect = effect(()=>{
    this.roomTypesService.ensureLoaded();
  })


  readonly heroImage = computed(() => {
    const rooms = this.roomTypesState().data;
    return rooms[2]?.imageUrl || rooms[0]?.imageUrl || '';
  });

  handleBook(roomTypeId: RoomType['id']): void {
    this.router.navigate(['/book'], { queryParams: { roomTypeId } });
  }


}
