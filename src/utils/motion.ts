import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function ensureGsapRegistered(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create('InOut', '0.75,0,0.25,1');
  CustomEase.create('Out', '0.25,1,0.5,1');
  CustomEase.create('In', '0.5,0,0.75,0');
  CustomEase.create('Ease', '0.25,0.1,0.25,1');
  CustomEase.create('diveIn', '0.6,0,0,1');
  CustomEase.create('horScroll', '0.25,0,0.75,1');
  CustomEase.create(
    'loaderEase',
    'M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1'
  );
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
