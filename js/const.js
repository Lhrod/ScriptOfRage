const MAX_Y = 224; // This is the max value of height of sega genesis resolution
const MIN_Y = MAX_Y - 51; // walkable area
const MAX_X_RESOLUTION = 320;
const MAX_X = MAX_X_RESOLUTION - 1;

const WALK = 0;
const IDLE = 1;
const PUNCH = 2;
const KICKED = 3;
const DYING = 4;
const DYE = 5;

const SPEED_WALK = 2;

const TIME_BETWEEN_HITS = 300; // Miliseconds for decrease life

const cssClass4Hero = ['walk', 'idle', 'punch', 'kicked', 'dying', 'dye'];
const cssClass4Vice = ['vice_walk', 'vice_idle', 'vice_punch', 'vice_kicked', 'vice_dying', 'vice_dye'];
