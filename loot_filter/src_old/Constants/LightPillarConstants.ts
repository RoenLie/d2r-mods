export abstract class LightPillarConstants {

	// item paths
	static readonly PATH_ITEMS = 'hd\\items\\';
	static readonly PATH_ITEMS_MISC = `${ this.PATH_ITEMS }misc\\`;
	static readonly PATH_ITEMS_WEAPON = `${ this.PATH_ITEMS }weapon\\`;
	static readonly PATH_ITEMS_MISC_BODY_PART = `${ this.PATH_ITEMS_MISC }body_part\\`;
	static readonly PATH_ITEMS_MISC_QUEST = `${ this.PATH_ITEMS_MISC }quest\\`;
	static readonly PATH_ITEMS_MISC_SCROLL = `${ this.PATH_ITEMS_MISC }scroll\\`;
	static readonly PATH_ITEMS_MISC_AMULET = `${ this.PATH_ITEMS_MISC }amulet\\`;
	static readonly PATH_ITEMS_MISC_RING = `${ this.PATH_ITEMS_MISC }ring\\`;
	static readonly PATH_ITEMS_MISC_RUNE = `${ this.PATH_ITEMS_MISC }rune\\`;
	static readonly PATH_ITEMS_MISC_GEM = `${ this.PATH_ITEMS_MISC }gem\\`;
	static readonly PATH_ITEMS_MISC_KEY = `${ this.PATH_ITEMS_MISC }key\\`;
	static readonly PATH_ITEMS_WEAPON_HAMMER = `${ this.PATH_ITEMS_WEAPON }hammer\\`;
	static readonly PATH_ITEMS_WEAPON_CLUB = `${ this.PATH_ITEMS_WEAPON }club\\`;
	static readonly PATH_ITEMS_WEAPON_MACE = `${ this.PATH_ITEMS_WEAPON }mace\\`;
	static readonly PATH_ITEMS_WEAPON_KNIFE = `${ this.PATH_ITEMS_WEAPON }knife\\`;
	static readonly PATH_ITEMS_WEAPON_STAFF = `${ this.PATH_ITEMS_WEAPON }staff\\`;

	// vfx paths
	protected static readonly PATH_VFX_BASE = 'data/hd/vfx/particles/overlays/';
	protected static readonly PATH_HORADRIC_LIGHT = `${ this.PATH_VFX_BASE }object/horadric_light/fx_horadric_light.particles`;
	protected static readonly PATH_PALADIN_FANATICISM = `${ this.PATH_VFX_BASE }paladin/aura_fanatic/aura_fanatic.particles`;
	protected static readonly PATH_VALKYRIE_START = `${ this.PATH_VFX_BASE }common/valkyriestart/valkriestart_overlay.particles`;

	// vfx names
	protected static readonly DEFINITION_COMPONENT_TRANSFORM = 'TransformDefinitionComponent';
	protected static readonly DEFINITION_COMPONENT_VFX = 'VfxDefinitionComponent';
	protected static readonly NAME_TRANSFORM1 = 'component_transform1';
	protected static readonly NAME_VFX_STOLEN = 'entity_vfx_filthyStolenMod';
	protected static readonly NAME_VFX_ROOT = 'entity_root_VfxDefinition';

	// vfx params
	protected static readonly TYPE_ENTITY = 'Entity';
	protected static readonly NAME_DROPLIGHT = 'droplight';
	protected static readonly NAME_ENTITY_ROOT = 'entity_root';
	protected static readonly ID_DROPLIGHT = 9999996974;
	protected static readonly ID_ENTITY_ROOT = 1079187010;

	// vfx light pillar
	static readonly LIGHT_PILLAR_COMPONENT = {
		particle: {
			path: this.PATH_HORADRIC_LIGHT,
		},
		entities: [
			{
				type:       this.TYPE_ENTITY,
				name:       this.NAME_DROPLIGHT,
				id:         this.ID_DROPLIGHT,
				components: [
					{
						type:                this.DEFINITION_COMPONENT_TRANSFORM,
						name:                this.NAME_TRANSFORM1,
						position:            { x: 0, y: 0, z: 0 },
						orientation:         { x: 0, y: 0, z: 0, w: 1 },
						scale:               { x: 1, y: 1, z: 1 },
						inheritOnlyPosition: false,
					},
					{
						type:              this.DEFINITION_COMPONENT_VFX,
						name:              this.NAME_VFX_STOLEN,
						filename:          this.PATH_HORADRIC_LIGHT,
						hardKillOnDestroy: false,
					},
				],
			},
			{
				type:       this.TYPE_ENTITY,
				name:       this.NAME_ENTITY_ROOT,
				id:         this.ID_ENTITY_ROOT,
				components: [
					{
						type:              this.DEFINITION_COMPONENT_VFX,
						name:              this.NAME_VFX_ROOT,
						filename:          this.PATH_PALADIN_FANATICISM,
						hardKillOnDestroy: false,
					},
				],
			},
			{
				type:       this.TYPE_ENTITY,
				name:       this.NAME_DROPLIGHT,
				id:         this.ID_DROPLIGHT,
				components: [
					{
						type:                this.DEFINITION_COMPONENT_TRANSFORM,
						name:                this.NAME_TRANSFORM1,
						position:            { x: 0, y: 0, z: 0 },
						orientation:         { x: 0, y: 0, z: 0, w: 1 },
						scale:               { x: 1, y: 1, z: 1 },
						inheritOnlyPosition: false,
					},
					{
						type:              this.DEFINITION_COMPONENT_VFX,
						name:              this.NAME_VFX_STOLEN,
						filename:          this.PATH_VALKYRIE_START,
						hardKillOnDestroy: false,
					},
				],
			},
		] as JSONData[],
	};

}
