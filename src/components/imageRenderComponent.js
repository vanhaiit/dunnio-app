import React, { Component } from 'react';
import initPropeties from '../utils/defaultPropetiesClothes';
import initPropetiesExtra from '../utils/defaultPropetiesClothesExtra';
import imageError from '../utils/imageEmpty';
import defaultDesign from '../utils/defaultDesign';
import { connect } from 'react-redux';
import { actDesignCustom, actOrderDesignCustom } from '../actions';

class ImageRenderComponent extends Component {

    isNotExists = false;
    designCustom = {};
    orderDesign = { "V": [], "S": [], "G": [], "Q": [], "M": [] }
    constructor(props) {
        super(props); this.state = {
            prefix: true,
            inside: false,
            hide_cavat: false,
            jacket: false,
            pants: false,
            waistcoat: false,
            shirt: false,
            coat_2: false,
            sub_pants: false
        }
    }

    componentDidMount() {
        console.log(this.props);
        var { pathname } = window.location;
        if (pathname) {
            switch (pathname.split("/")[2]) {
                case 'v':
                    this.props.onDesignCustom(defaultDesign.design_v);
                    break;
                case 's':
                    this.props.onDesignCustom(defaultDesign.design_s);
                    break;
                case 'm':
                    this.props.onDesignCustom(defaultDesign.design_m);
                    break;
            }
        }
    }

    componentWillMount() {
        var { pathname } = window.location;
        var images = [];
        if (pathname) {
            switch (pathname.split("/")[2]) {
                case 'v':
                    /**vest vs pants */
                    images = (this.props.design.V) ? this.props.design.V.concat(this.props.design.V_lining__contrast) : defaultDesign.design_v.V.concat(defaultDesign.design_v.V_lining__contrast);

                    /**vest vs pants */
                    (this.props.design.Q) ? images = images.concat(this.props.design.Q) : images = images.concat(initPropeties.pants.value);

                    /**vest vs gile */
                    (this.props.design.G) ? images = images.concat(this.props.design.G) : images = images.concat(initPropeties.gile.value);

                    break;
                case 's':
                    if (this.props.design.S) images = this.props.design.S.concat(initPropeties.pants.value);
                    else images = defaultDesign.design_s.S.concat(initPropeties.pants.value);
                    break;
                case 'm':
                    this.setState({ sub_pants: true });
                    if (this.props.design.M) images = this.props.design.M.concat(this.props.design.M_coat_lining__contrast).concat(initPropeties.pants.value);
                    else images = defaultDesign.design_m.M.concat(defaultDesign.design_m.M_coat_lining__contrast).concat(initPropeties.pants.value);
                    break;

                default:
                    var images = initPropeties.jacket.value.concat(initPropeties.pants.value);
                    break;
            }
        }
        if (this.props.passRefUpward) this.props.passRefUpward(this);

        this.setState({ initPropeties: images })
    }

    showImageRender = images => {
        var result = images.map((element, index) => {
            var subUrl = "";
            if (element.element.length === 0) return false;
            element.index ? element.index.map(ix => { if (element.element[ix]) subUrl += element.element[ix] + "+"; }) : element.element.map(e => { if (e) subUrl += e + "+" });
            subUrl = subUrl.slice(0, subUrl.length - 1);

            let check = imageError.find(x => x === subUrl);
            if (check) return false;
            if ((element.prefix === "front/" || element.prefix === "") && this.state.prefix) {
                if (element.key === "caravat") return false;
                if (element.inside) return <img key={index} hidden={this.state.inside} id={`image_render_${index}`} src={`http://cdn.csell.vn/duynguyen/3d/new_man/${element.ingredient}/STD/${element.fabric}${element.prefix}${subUrl}${element.suffix}`} className={element.className} style={{ zIndex: element.zIndex }} />
                if (element.inside_extra) return <img key={index} hidden={!this.state.inside} id={`image_render_${index}`} src={`http://cdn.csell.vn/duynguyen/3d/new_man/${element.ingredient}/STD/${element.fabric}${element.prefix}${subUrl}${element.suffix}`} className={element.className} style={{ zIndex: element.zIndex }} />

                if (element.ingredient === "jacket") return <img key={index} hidden={this.state.jacket} id={`image_render_${index}`} src={`http://cdn.csell.vn/duynguyen/3d/new_man/${element.ingredient}/STD/${element.fabric}${element.prefix}${subUrl}${element.suffix}`} className={element.className} style={{ zIndex: element.zIndex }} />
                if (element.ingredient === "pants") return <img key={index} hidden={this.state.pants} id={`image_render_${index}`} src={`http://cdn.csell.vn/duynguyen/3d/new_man/${element.ingredient}/STD/${element.fabric}${element.prefix}${subUrl}${element.suffix}`} className={element.className} style={{ zIndex: element.zIndex }} />
                if (element.ingredient === "waistcoat") return <img key={index} hidden={this.state.waistcoat} id={`image_render_${index}`} src={`http://cdn.csell.vn/duynguyen/3d/new_man/${element.ingredient}/STD/${element.fabric}${element.prefix}${subUrl}${element.suffix}`} className={element.className} style={{ zIndex: element.zIndex }} />
                if (element.ingredient === "shirt") return <img key={index} hidden={this.state.shirt} id={`image_render_${index}`} src={`http://cdn.csell.vn/duynguyen/3d/new_man/${element.ingredient}/STD/${element.fabric}${element.prefix}${subUrl}${element.suffix}`} className={element.className} style={{ zIndex: element.zIndex }} />
                if (element.ingredient === "coat_2") return <img key={index} hidden={this.state.coat_2} id={`image_render_${index}`} src={`http://cdn.csell.vn/duynguyen/3d/new_man/${element.ingredient}/STD/${element.fabric}${element.prefix}${subUrl}${element.suffix}`} className={element.className} style={{ zIndex: element.zIndex }} />

                return <img key={index} id={`image_render_${index}`} src={`http://cdn.csell.vn/duynguyen/3d/new_man/${element.ingredient}/STD/${element.fabric}${element.prefix}${subUrl}${element.suffix}`} className={element.className} style={{ zIndex: element.zIndex }} />
            }

            if (element.prefix === "back/" && !this.state.prefix) return <img key={index} id={`image_render_${index}`} src={`http://cdn.csell.vn/duynguyen/3d/new_man/${element.ingredient}/STD/${element.fabric}${element.prefix}${subUrl}${element.suffix}`} className={element.className} style={{ zIndex: element.zIndex }} />
        })
        return result;
    }

    setProperties = (style, fabric) => {

        var orderItem = {
            key: style.props_name,
            value: style.value,
            short_key: style.short_key,
            fabricid: fabric ? fabric.id : null,
            fabric_name: fabric ? fabric.name : null
        }
        var check_order;
        if (this.orderDesign[style.short_key].length > 0) {
            check_order = this.orderDesign[style.short_key].find(x => x.key === style.props_name);
            if (check_order) {
                let index = this.orderDesign[style.short_key].indexOf(check_order);
                this.orderDesign[style.short_key].splice(index, 1);
                this.orderDesign[style.short_key].push(orderItem);
            } else {
                this.orderDesign[style.short_key].push(orderItem);
            }

        } else {
            this.orderDesign[style.short_key].push(orderItem);
        }

        if (!style) return false;

        var propetiesUpdate = [];

        var imageView = [];

        if (this.props.hidenSubMenuProperties) this.props.hidenSubMenuProperties(style)

        if (style.short_key === "V") {
            let exPropetiesUpdate = [];
            /**insert extra to design */
            if (style.group_to_change) {
                initPropetiesExtra.jacket.value.map(p => {
                    style.group.map(g => { if (p.key === g) p[style.index[g]] = style.image[g].front ? style.image[g].front : style.image[g].back; });

                    style.group_to_change.map(g => {
                        if (p.key === g) {
                            if (fabric) p[style.index[g]] = fabric.fabric;
                            if (style.props_name === "lining__contrast") p['inside_extra'] = true;
                            exPropetiesUpdate.push(p);
                        }
                    });

                    if (p.key === "default_lot_ao_vest_tren") { p['inside_extra'] = true; exPropetiesUpdate.push(p); };
                    if (p.key === "cuc_boc_vai_sau" || p.key === "cuc_boc_vai_truoc") p.inside_extra = false;
                    if (p.key === "cuc_boc_vai_truoc" || p.key === "holes_ban_ve" || p.key === "bong_ve_ao_vest" || p.key === "holes_kieu_dang")
                        p.element = this.state.initPropeties.find(x => x.key === "giua_ao_vest").element;
                    if (style.value === "Tháo lót" && (p.key === "lot_ao_vest_duoi" || p.key === "lot_ao_vest_tren")) {
                        p.fabric = "linings/161_fabric/"; p['inside_extra'] = true; exPropetiesUpdate.push(p);
                    }
                    this.setState({ inside: true, prefix: true, pants: true, hide_cavat: true });
                });
                propetiesUpdate = this.props.design.V;
            } else {
                initPropeties.jacket.value.map(p => {
                    style.group.map(g => {
                        if (p.key === g) {
                            style.index[g].forEach((ix, index) => {
                                if (style.image[g].front) p.element[ix] = style.image[g].front[index] ? style.image[g].front[index] : p.element[ix];
                                if (style.image[g].back) p.element[ix] = style.image[g].back[index] ? style.image[g].back[index] : p.element[ix];
                            });
                            p['index'] = style.index[g];
                        }
                    });
                    propetiesUpdate.push(p)
                });
            }
            /**push extra to redux */
            if (exPropetiesUpdate.length > 0) {
                this.designCustom[style.short_key + "_" + style.props_name] = exPropetiesUpdate;
                this.props.onDesignCustom(this.designCustom);
                if (!this.props.design[style.short_key + "_lining__contrast"]) this.designCustom[style.short_key + "_lining__contrast"] = defaultDesign.design_v.V_lining__contrast;
            } else {
                this.designCustom[style.short_key + "_lining__contrast"] = defaultDesign.design_v.V_lining__contrast;
                this.props.onDesignCustom(this.designCustom);
            }
            /**inset design */


            /**push design to redux */
            this.designCustom[style.short_key] = propetiesUpdate;
            this.props.onDesignCustom(this.designCustom);
            /**review image */
            if (!this.props.design.Q) imageView = propetiesUpdate.concat(initPropeties.pants.value);
            else imageView = propetiesUpdate.concat(this.props.design.Q);

            if (exPropetiesUpdate.length > 0) imageView = imageView.concat(exPropetiesUpdate);
            else imageView = imageView.concat(defaultDesign.design_v.V_lining__contrast);

            defaultDesign.key_extra_v.forEach(element => {
                if (this.props.design[element]) if (element !== "V") imageView = imageView.concat(this.props.design[element])
            });



        }

        if (style.short_key === "Q") {
            initPropeties.pants.value.map(p => {
                style.group.map(g => {
                    if (p.key === g) {
                        style.index[g].forEach((ix, index) => {
                            if (style.image[g].front) p.element[ix] = style.image[g].front[index] ? style.image[g].front[index] : p.element[ix];
                            if (style.image[g].back) p.element[ix] = style.image[g].back[index] ? style.image[g].back[index] : p.element[ix];
                        });
                        p['index'] = style.index[g];
                    }
                });
                p['inside'] = true;
                propetiesUpdate.push(p);
            });
            this.designCustom[style.short_key] = propetiesUpdate;
            this.props.onDesignCustom(this.designCustom);
            if (!this.props.design.S) imageView = propetiesUpdate.concat(initPropeties.shirt.value);
            else imageView = propetiesUpdate.concat(this.props.design.S)
        }

        if (style.short_key === "S") {
            let exPropetiesUpdate = [];
            initPropetiesExtra.shirt.value.map(p => {
                style.group.map(g => { if (p.key === g) p[style.index[g]] = style.image[g].front ? style.image[g].front : style.image[g].back; });
                if (style.group_to_change) {
                    style.group_to_change.map(g => {
                        if (p.key === g) {
                            if (fabric) p.fabric = fabric.fabric;
                            p.element[style.index[g]] = style.image[g].front ? style.image[g].front : style.image[g].back;
                            exPropetiesUpdate.push(p);
                        }
                    });
                    this.setState({ hide_cavat: true })
                }
            });

            if (exPropetiesUpdate.length > 0) {
                this.designCustom[style.short_key + "_" + style.props_name] = exPropetiesUpdate;
                this.props.onDesignCustom(this.designCustom);
            }

            initPropeties.shirt.value.map(p => {
                style.group.map(g => {
                    if (p.key === g) {
                        style.index[g].forEach((ix, index) => {
                            if (style.image[g].front) p.element[ix] = style.image[g].front[index] ? style.image[g].front[index] : p.element[ix];
                            if (style.image[g].back) p.element[ix] = style.image[g].back[index] ? style.image[g].back[index] : p.element[ix];
                        });
                        p['index'] = style.index[g];
                    }
                });
                propetiesUpdate.push(p)
            });
            this.designCustom[style.short_key] = propetiesUpdate;
            this.props.onDesignCustom(this.designCustom);
            if (!this.props.design.Q) imageView = propetiesUpdate.concat(initPropeties.pants.value);
            else imageView = propetiesUpdate.concat(this.props.design.Q);

            if (exPropetiesUpdate.length > 0) imageView = imageView.concat(exPropetiesUpdate);

            this.setState({ hide_cavat: true });

            defaultDesign.key_extra_s.forEach(element => {
                if (this.props.design[element]) imageView = imageView.concat(this.props.design[element])
            });


        }

        if (style.short_key === "G") {
            if (style.id === "waistcoat_lapel_peak" || style.id === "waistcoat_lapel_round" || style.id === "waistcoat_lapel_notch") this.isNotExists = false;
            if (style.id === "waistcoat_no_lapel" || style.id === "waistcoat_piece") this.isNotExists = true;
            initPropeties.gile.value.map(p => {
                if (style.group.length === 0 && p.key === "ao_gile") p['index'] = [0, 1, 2];
                style.group.map(g => {
                    if (p.key === g) {
                        style.index[g].forEach((ix, index) => {
                            if (style.image[g].front) p.element[ix] = style.image[g].front[index] ? style.image[g].front[index] : p.element[ix];
                            if (style.image[g].back) p.element[ix] = style.image[g].back[index] ? style.image[g].back[index] : p.element[ix];
                            if (style.special && p.key === "ao_gile") if (style.special === "style_lapel_no") p.element[2] = "style_lapel_no";
                        });
                        p['index'] = style.index[g];
                    }
                });
                if (this.isNotExists && p.key === "ao_gile" && p.index.length === 3) p.index.splice(1, 1);
                if (!this.isNotExists && p.key === "ao_gile" && p.index.length === 2) p.index.splice(1, 0, 1);
                propetiesUpdate.push(p);
            });

            this.designCustom[style.short_key] = propetiesUpdate;

            this.props.onDesignCustom(this.designCustom);

            let _array, __array;
            if (!this.props.design.S) _array = propetiesUpdate.concat(initPropeties.shirt.value);
            else _array = propetiesUpdate.concat(this.props.design.S);

            if (!this.props.design.Q) __array = propetiesUpdate.concat(initPropeties.pants.value);
            else __array = propetiesUpdate.concat(this.props.design.Q);

            imageView = _array.concat(__array);
        }

        if (style.short_key === "M") {

            let exPropetiesUpdate = [];
            if (style.group_to_change) {
                initPropetiesExtra.coat.value.map(p => {
                    style.group.map(g => { if (p.key === g) p[style.index[g]] = style.image[g].front ? style.image[g].front : style.image[g].back; });
                    style.group_to_change.map(g => {
                        if (p.key === g) {
                            if (fabric) p.fabric = fabric.fabric;
                            p['inside_extra'] = true;
                            if (p.key === "pha_co_ao_mangto") p.element = this.props.design.M.find(x => x.key === "giua_ao_mangto").element;
                            if (p.key === "pha_co_ao_mangto") p["index"] = this.props.design.M.find(x => x.key === "giua_ao_mangto").index;
                            exPropetiesUpdate.push(p);
                        }
                    });
                    if (style.value === "Tháo lót" && (p.key === "lot_ao_mangto_tren" || p.key === "lot_ao_mangto_unlined_tren")) {
                        p.fabric = "linings/161_fabric/"; p['inside_extra'] = true; exPropetiesUpdate.push(p);
                    }
                    if (p.key === "default_lot_ao_mangto_tren") {
                        p['inside_extra'] = true; exPropetiesUpdate.push(p);
                    }
                    this.setState({ hide_cavat: true, pants: true, inside: true })
                });

                propetiesUpdate = this.props.design.M;

            } else {
                initPropeties.coat.value.map(p => {
                    style.group.map(g => {
                        if (p.key === g) {
                            style.index[g].forEach((ix, index) => {
                                if (!style.special) {
                                    (style.image[g].front) ?
                                        p.element[ix] = style.image[g].front[ix] ? style.image[g].front[ix] : p.element[ix] :
                                        p.element[ix] = style.image[g].back[ix] ? style.image[g].back[ix] : p.element[ix];
                                } else {
                                    if (style.image[g].front) p.element[ix] = style.image[g].front[index] ? style.image[g].front[index] : p.element[ix];
                                    if (style.image[g].back) p.element[ix] = style.image[g].back[index] ? style.image[g].back[index] : p.element[ix];
                                    if (ix > index) p.element[ix] = style.image[g].front[ix];
                                }
                            });
                            style.special ? p['index'] = style.index[g] : p['index'] = p["index"];
                        }
                    });
                    propetiesUpdate.push(p);
                });
            }

            if (exPropetiesUpdate.length > 0) {
                this.designCustom[style.short_key + "_" + style.props_name] = exPropetiesUpdate;
                this.props.onDesignCustom(this.designCustom);
                if (!this.props.design[style.short_key + "_coat_lining__contrast"]) this.designCustom[style.short_key + "_coat_lining__contrast"] = defaultDesign.design_m.M_coat_lining__contrast;
            } else {
                this.designCustom[style.short_key + "_coat_lining__contrast"] = defaultDesign.design_m.M_coat_lining__contrast;
                this.props.onDesignCustom(this.designCustom);
            }

            this.designCustom[style.short_key] = propetiesUpdate;

            this.props.onDesignCustom(this.designCustom);

            let _array, __array, ___array;
            console.log(propetiesUpdate.length, initPropeties.shirt.value);

            if (!this.props.design.S) _array = propetiesUpdate.concat(initPropeties.shirt.value);
            else _array = propetiesUpdate.concat(this.props.design.S);

            if (!this.props.design.Q) __array = propetiesUpdate.concat(initPropeties.pants.value);
            else __array = propetiesUpdate.concat(this.props.design.Q);

            if (!this.props.design.V) ___array = propetiesUpdate.concat(initPropeties.jacket.value);
            else ___array = propetiesUpdate.concat(this.props.design.V);

            imageView = _array.concat(__array).concat(___array);

            if (exPropetiesUpdate.length > 0) imageView = imageView.concat(exPropetiesUpdate);
            else imageView = imageView.concat(defaultDesign.design_m.M_coat_lining__contrast);

            defaultDesign.key_extra_m.forEach(element => {
                if (this.props.design[element]) if (element !== "M") imageView = imageView.concat(this.props.design[element])
            });
        };

        this.setState({ initPropeties: imageView, short_key: style.short_key });
        this.props.onOrderDesignCustom(this.orderDesign);
        console.log(this.orderDesign);


    }

    showImageRenderReverse = () => {
        if (this.state.inside) return <img hidden={this.state.hide_pants} style={{ display: this.state.sub_pants ? "none" : "block" }} className="pants_folded" src="http://cdn.csell.vn/duynguyen/3d/new_man/pants/STD/1645_fabric/folded/length_long+cut_slim.png" style={{ zIndex: 26 }} />;
        if (this.state.prefix) {
            return (
                <div>
                    <img hidden={this.state.hide_cavat} src="http://cdn.csell.vn/duynguyen/3d/new_man/jacket/STD/ties/1/corbata_estrecha.png" alt="" className="shirt" style={{ zIndex: 31 }} />
                    <img src="http://cdn.csell.vn/duynguyen/3d/new_man/shirt/STD/699_fabric/front/shirt_to_jacket.png" className="shirt" style={{ zIndex: 20 }} />
                    <img src="http://cdn.csell.vn/duynguyen/3d/new_man/models/STD/front/carlos.png" style={{ zIndex: 10 }} />
                    <img src="http://cdn.csell.vn/duynguyen/3d/new_man/pants/STD/zapatos/black/front/zapatos.png" style={{ zIndex: 26 }} />
                </div>
            )
        }
        return (
            <div>
                <img src="http://cdn.csell.vn/duynguyen/3d/new_man/shirt/STD/699_fabric/back/shirt_to_pants.png" className="shirt" style={{ zIndex: 20 }} />
                <img src="http://cdn.csell.vn/duynguyen/3d/new_man/models/STD/back/carlos.png" style={{ zIndex: 10 }} />
                <img src="http://cdn.csell.vn/duynguyen/3d/new_man/pants/STD/zapatos/black/back/zapatos.png" style={{ zIndex: 26 }} />
            </div>
        )
    }

    actShowImage = type => {
        switch (type) {
            case "accents":
                this.setState({ inside: !this.state.inside, prefix: true, pants: !this.state.pants })
                break;
            case "reverse":
                if (this.state.inside) this.setState({ inside: !this.state.inside, prefix: false, pants: false });
                this.setState({ prefix: !this.state.prefix, inside: false, pants: false })
                break;
        }
    }

    render() {
        return (
            <div className="col-md-5" id="dunnio_show-result" style={{ height: '700px' }}>
                <span className="btn_sidebar-show" ><i className="fa fa-bars icon_back" ></i></span>
                <div id="available_window" className="image_render man_suit fabric_step">
                    <div className="layers viewport " id="viewport" style={{ width: '230px', left: '-238px', top: '-20px' }}>
                        {this.showImageRender(this.state.initPropeties)}
                        {this.showImageRenderReverse()}
                    </div>
                </div>
                <div className="btn_togger_back_front">
                    <span className="btngroup">
                        <button id="accents" className="btngroup--btn" onClick={() => this.actShowImage("accents")}><i className="fas fa-paint-brush"></i></button>
                        <span style={{ color: "#afafaf" }}>accents</span>
                        <button id="reverse" className="btngroup--btn" onClick={() => this.actShowImage("reverse")}><i className="fas fa-sync-alt"></i></button>
                        <span style={{ color: "#afafaf" }}>reverse</span>
                        {/* <button id="move" className="btngroup--btn"><i className="fas fa-arrows-alt-v"></i></button>
                        <span style={{ color: "#afafaf" }}>move</span> */}
                    </span>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDesignCustom: (design) => {
            dispatch(actDesignCustom(design))
        },
        onOrderDesignCustom: (orderDesign) => {
            dispatch(actOrderDesignCustom(orderDesign))
        }
    }
}

const mapStateToProps = ({ design }) => {
    return {
        design: design.design,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageRenderComponent);
