/* A class for each individual creature */


export default class Creature {

    constructor() {
        
    }

    setName(value) {
        this.Name = value;
    }

    setCR(value) {
        this.CR = value;
    }

    setXP(value) {
        this.XP = value;
    }

    setRace(value) {
        this.Race = value;
    }

    //This will be an array
    setClass(value) {
        this.Class = value;
    }


    setAlignment(value) {
        this.Alignment = value;
    }

    setSize(value) {
        this.Size = value;
    }

    setType(value) {
        this.Type = value;
    }

    //This will be an array
    setSubtype(value) {
        this.Subtype = value;
    }

    setAC(value) {
        this.AC = value;
    }

    setAC_Touch(value) {
        this.AC_Touch = value;
    }

    //There was a hyphen here Flat-footed
    setAC_Flatfooted(value) {
        this.AC_Flatfooted = value;
    }

    setHP(value) {
        this.HP = value;
    }

    setHD(value) {
        this.HD = value;
    }

    setFort(value) {
        this.Fort = value;
    }

    setRef(value) {
        this.Ref = value;
    }

    setWill(value) {
        this.Will = value;
    }

    setMelee(value) {
        this.Melee = value;
    }

    setRanged(value) {
        this.Ranged = value;
    }

    setSpace(value) {
        this.Space = value;
    }

    setReach(value) {
        this.Reach = value;
    }

    setStr(value) {
        this.Str = value;
    }

    setDex(value) {
        this.Dex = value;
    }

    setCon(value) {
        this.Con = value;
    }

    setInt(value) {
        this.Int = value;
    }

    setWis(value) {
        this.Wis = value;
    }

    setCha(value) {
        this.Cha = value;
    }

    //An Array
    setFeats(value) {
        this.Feats = value;
    }

    //An Array
    setSkills(value) {
        this.Skills = value;
    }

    //An Array
    setRacialMods(value) {
        this.RacialMods = value;
    }
    
    //An Array
    setLanguages(value) {
        this.Languages = value;
    }

    setSQ(value) {
        this.SQ = value;
    }

    setEnvironment(value) {
        this.Environment = value;
    }

    setOrganization(value) {
        this.Organization = value;
    }

    setTreasure(value) {
        this.Treasure = value;
    }

    setGroup(value) {
        this.Group = value;
    }

    setGear(value) {
        this.Gear = value;
    }

    //Might remove this
    setOtherGear(value) {
        this.OtherGear = value;
    }

    setCharacterFlag(value) {
        this.CharacterFlag = value;
    }

    setCompanionFlag(value) {
        this.CompanionFlag = value;
    }

    //Might adjust all the speeds to one object
    setSpeed(value) {
        this.Movement = value;
    }
    
    /*
    setBase_Speed(value) {
        this.Base_Speed = value;
    }

    setFly_Speed(value) {
        this.Fly_Speed = value;
    }

    setManeuverability(value) {
        this.Maneuverability = value;
    }

    setClimb_Speed(value) {
        this.Climb_Speed = value;
    }

    setSwim_Speed(value) {
        this.Swim_Speed = value;
    }

    setBurrow_Speed(value) {
        this.Burrow_Speed = value;
    }

    setSpeed_Special(value) {
        this.Speed_Special = value;
    }

    setSpeed_Land(value) {
        this.Speed_Land = value;
    }

    setFly(value) {
        this.Fly = value;
    }

    setClimb(value) {
        this.Climb = value;
    }

    setBurrow(value) {
        this.Burrow = value;
    }

    setSwim(value) {
        this.Swim = value;
    }
    */

    setVariantParent(value) {
        this.VariantParent = value;
    }

    setClassArchetypes(value) {
        this.ClassArchetypes = value;
    }

    setCompanionFamiliarLink(value) {
        this.CompanionFamiliarLink = value;
    }

    setAlternateNameForm(value) {
        this.AlternateNameForm = value;
    }

    setid(value) {
        this.id = value;
    }

    setUniqueMonster(value) {
        this.UniqueMonster = value;
    }

    setMR(value) {
        this.MR = value;
    }

    setMythic(value) {
        this.Mythic = value;
    }

    setMT(value) {
        this.MT = value;
    }

    setSource(value) {
        this.Source = value;
    }

}